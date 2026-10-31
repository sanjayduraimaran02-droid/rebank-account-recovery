const BankIntegrationAdapter = require('./BankIntegrationAdapter');
const crypto = require('crypto');

class MockBankAdapter extends BankIntegrationAdapter {
  constructor(config = {}) {
    super(config);
    this.latencyMs = parseInt(process.env.MOCK_BANK_LATENCY_MS || config.latencyMs || '100', 10);
    this.failRate = parseFloat(process.env.MOCK_BANK_FAIL_RATE || config.failRate || '0.0');
    this.processedIdempotency = new Map();
    this.cbsTelemetryLog = [];
    this.isAuthorized = false; // Production banking actions disabled
  }

  /**
   * Internal helper to simulate core banking network latency
   */
  async _simulateLatency() {
    if (this.latencyMs > 0) {
      await new Promise(resolve => setTimeout(resolve, this.latencyMs));
    }
  }

  /**
   * Internal telemetry logger
   */
  _logTelemetry(action, payload, result) {
    const entry = {
      id: 'cbs-tel-' + crypto.randomUUID().slice(0, 8),
      timestamp: new Date().toISOString(),
      action,
      payload,
      result,
      adapterMode: 'SIMULATED_CBS_SANDBOX'
    };
    this.cbsTelemetryLog.unshift(entry);
    if (this.cbsTelemetryLog.length > 100) {
      this.cbsTelemetryLog.pop();
    }
    return entry;
  }

  getTelemetry() {
    return this.cbsTelemetryLog;
  }

  setLatency(ms) {
    this.latencyMs = ms;
  }

  setFailRate(rate) {
    this.failRate = rate;
  }

  /**
   * Simulates querying CBS account status
   */
  async getAccountStatus(cbsAccountRef) {
    await this._simulateLatency();

    // Check simulated failure injection
    if (Math.random() < this.failRate) {
      const err = new Error('CBS_GATEWAY_TIMEOUT: Simulated Core Banking System timeout error');
      err.code = 'CBS_TIMEOUT';
      this._logTelemetry('GET_ACCOUNT_STATUS_FAILED', { cbsAccountRef }, { error: err.message });
      throw err;
    }

    const mockResponse = {
      cbsAccountRef,
      connectedCore: 'SIMULATED_FINACLE_CORE_V11',
      onlineStatus: 'ONLINE_ACTIVE',
      currency: 'USD',
      clearingNetwork: 'ACH / WIRE / FEDNOW SIMULATED',
      lastSyncedAt: new Date().toISOString()
    };

    this._logTelemetry('GET_ACCOUNT_STATUS_SUCCESS', { cbsAccountRef }, mockResponse);
    return mockResponse;
  }

  /**
   * Simulates Core Banking customer identity verification
   */
  async verifyCustomerIdentity(cbsAccountRef, customerPayload) {
    await this._simulateLatency();

    const ocrMatchScore = 0.96 + Math.random() * 0.03;
    const livenessScore = 0.95 + Math.random() * 0.04;

    const result = {
      cbsAccountRef,
      matchResult: 'MATCH_CONFIRMED',
      ocrConfidence: parseFloat(ocrMatchScore.toFixed(2)),
      biometricLiveness: parseFloat(livenessScore.toFixed(2)),
      cbsKycFlag: 'VERIFIED',
      verifiedAt: new Date().toISOString()
    };

    this._logTelemetry('VERIFY_IDENTITY', { cbsAccountRef, customerPayload }, result);
    return result;
  }

  /**
   * Executes unfreezing / hold release on simulated Core Banking System
   */
  async releaseAccountHold(cbsAccountRef, holdReasonCode, authorizationPayload = {}) {
    await this._simulateLatency();

    const { approverId, makerId, idempotencyKey, legalRef } = authorizationPayload;

    // Check idempotency
    if (idempotencyKey && this.processedIdempotency.has(idempotencyKey)) {
      const cached = this.processedIdempotency.get(idempotencyKey);
      this._logTelemetry('RELEASE_HOLD_IDEMPOTENT_HIT', { cbsAccountRef, idempotencyKey }, cached);
      return cached;
    }

    // Four-Eyes validation: Approver must be distinct from Maker
    if (approverId && makerId && approverId === makerId) {
      const err = new Error('FOUR_EYES_VIOLATION: Approver cannot be the same user as Reviewer (Maker)');
      err.code = 'FOUR_EYES_VIOLATION';
      this._logTelemetry('RELEASE_HOLD_REJECTED', { cbsAccountRef, approverId, makerId }, { error: err.message });
      throw err;
    }

    // Check simulated failure injection
    if (Math.random() < this.failRate) {
      const err = new Error('CBS_SERVICE_UNAVAILABLE: Core Banking System host failed to respond');
      err.code = 'CBS_HOST_ERROR';
      this._logTelemetry('RELEASE_HOLD_FAILED', { cbsAccountRef, holdReasonCode }, { error: err.message });
      throw err;
    }

    const cbsTransactionRef = `CBS-UNFREEZE-${Date.now().toString().slice(-6)}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`;
    const result = {
      success: true,
      statusCode: 'CBS-OK-200',
      message: 'Account restriction hold successfully released in Core Banking System',
      cbsAccountRef,
      holdReasonCode,
      cbsTransactionRef,
      releasedAt: new Date().toISOString(),
      authorizedByApprover: approverId || 'SYS-APPROVER',
      clearedMakerId: makerId || null,
      legalReference: legalRef || null,
      newAccountState: 'ACTIVE'
    };

    if (idempotencyKey) {
      this.processedIdempotency.set(idempotencyKey, result);
    }

    this._logTelemetry('RELEASE_HOLD_SUCCESS', { cbsAccountRef, holdReasonCode, authorizationPayload }, result);
    return result;
  }

  /**
   * Queries hold details
   */
  async queryHoldDetails(cbsAccountRef) {
    await this._simulateLatency();
    const result = {
      cbsAccountRef,
      holdsDetected: true,
      clearingHoldStatus: 'RELEASE_PENDING_OPERATIONS_SIGN_OFF',
      regulatoryJurisdiction: 'US_DOMESTIC_RESERVE_DISTRICT_7',
      queriedAt: new Date().toISOString()
    };
    this._logTelemetry('QUERY_HOLD_DETAILS', { cbsAccountRef }, result);
    return result;
  }
}

// Export singleton instance
const mockBankAdapter = new MockBankAdapter();

module.exports = {
  MockBankAdapter,
  mockBankAdapter
};
