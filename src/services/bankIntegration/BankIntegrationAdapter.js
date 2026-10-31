/**
 * Provider-Neutral Bank Integration Adapter Interface
 * 
 * Defines standard contract for Core Banking System (CBS) interactions.
 * Production banking connectors must implement this interface using official
 * ISO 20022 / BIAN standard specifications, mutual TLS, and authorized credentials.
 */
class BankIntegrationAdapter {
  constructor(config = {}) {
    this.config = config;
  }

  /**
   * Check whether this adapter is authorized for live production core banking writes
   */
  isProductionAuthorized() {
    return false; // Safely disabled until formally authorized with production banking credentials
  }

  /**
   * Retrieves live account status, balance, and hold flags from Core Banking
   * @param {string} cbsAccountRef - e.g. "CBS-ACC-1002"
   * @returns {Promise<{ cbsAccountRef: string, status: string, balance: number, holds: Array }>}
   */
  async getAccountStatus(cbsAccountRef) {
    throw new Error('BankIntegrationAdapter.getAccountStatus must be implemented by provider adapter');
  }

  /**
   * Verifies customer identity and KYC documents against Core Banking host records
   * @param {string} cbsAccountRef
   * @param {object} verificationPayload
   */
  async verifyCustomerIdentity(cbsAccountRef, verificationPayload) {
    throw new Error('BankIntegrationAdapter.verifyCustomerIdentity must be implemented by provider adapter');
  }

  /**
   * Submits authorized instruction to release a specific account hold or restriction
   * @param {string} cbsAccountRef
   * @param {string} holdReasonCode
   * @param {object} authorizationPayload - { approverId, makerId, legalRef, idempotencyKey }
   * @returns {Promise<{ success: boolean, cbsTransactionRef: string, releasedAt: string, statusCode: string }>}
   */
  async releaseAccountHold(cbsAccountRef, holdReasonCode, authorizationPayload) {
    throw new Error('BankIntegrationAdapter.releaseAccountHold must be implemented by provider adapter');
  }

  /**
   * Queries hold details and regulatory lien metadata
   * @param {string} cbsAccountRef
   */
  async queryHoldDetails(cbsAccountRef) {
    throw new Error('BankIntegrationAdapter.queryHoldDetails must be implemented by provider adapter');
  }
}

module.exports = BankIntegrationAdapter;
