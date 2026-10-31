# ReBank Prototype — Step-by-Step Implementation Plan

**Target Architecture:** Node.js Express REST API + Responsive Mobile & Web Multi-Role Frontend  
**Persistence:** Transactional JSON & Seed Datastore with In-Memory State & Reset capability  
**Status:** Ready for Step-by-Step Execution  

---

## 1. System Architecture Overview

```
+-------------------------------------------------------------------------------------------------+
|                                    REBANK PLATFORM ARCHITECTURE                                 |
+-------------------------------------------------------------------------------------------------+
|                                                                                                 |
|   +---------------------------------------+    +--------------------------------------------+   |
|   |       CUSTOMER MOBILE EXPERIENCE      |    |        BANK OPERATIONS WEB COCKPIT         |   |
|   |  - Mobile Viewport / Frame Toggle     |    |  - Reviewer (Maker / L1) Triage Queue      |   |
|   |  - Restriction Diagnosis Banner       |    |  - Approver (Checker / L2) Dual Auth       |   |
|   |  - Interactive Recovery Wizard        |    |  - Admin Console (Audit Logs & CBS Config) |   |
|   |  - Live Status Timeline Tracker       |    |  - Instant Role Switcher Toolbar           |   |
|   +-------------------+-------------------+    +---------------------+----------------------+   |
|                       |                                              |                          |
|                       +----------------------+-----------------------+                          |
|                                              | HTTP / JSON REST API                             |
|                                              v                                                  |
|   +-----------------------------------------------------------------------------------------+   |
|   |                                  REBANK BACKEND SERVER                                  |   |
|   |  - Role-Based Access Control (RBAC) Middleware                                          |   |
|   |  - Four-Eyes Principle / Segregation of Duty Validator                                  |   |
|   |  - Ticket State Machine (SUBMITTED -> UNDER_REVIEW -> PENDING_APPROV -> RESTORED)       |   |
|   |  - Evidence Upload & Simulated AI/OCR Engine                                            |   |
|   +-------------------+-------------------------------------------------+-------------------+   |
|                       |                                                 |                       |
|                       v                                                 v                       |
|   +---------------------------------------+    +--------------------------------------------+   |
|   |         MOCK CORE BANKING (CBS)       |    |             AUDIT & RECOVERY STORE         |   |
|   |  - Synthetic Account Profiles         |    |  - Immutable Event Log (Actor, State, Time)|   |
|   |  - 6 Restriction Category Hold Rules  |    |  - Evidence Artifacts & OCR Confidence     |   |
|   |  - Real-time Unfreeze Hold Release API|    |  - Factory Reset / Reseed Capability       |   |
|   +---------------------------------------+    +--------------------------------------------+   |
|                                                                                                 |
+-------------------------------------------------------------------------------------------------+
```

---

## 2. Directory Layout & Folder Structure

```
d:\New project\
├── docs\
│   ├── WORKSPACE_AUDIT.md            # Pre-change workspace audit and environmental analysis
│   ├── REBANK_REQUIREMENTS.md        # Comprehensive Product Requirements Document (PRD)
│   └── IMPLEMENTATION_PLAN.md        # Step-by-step implementation guide (this document)
├── src\
│   ├── data\
│   │   ├── seedData.js               # Synthetic accounts across all 6 restriction categories
│   │   └── dataStore.js              # State manager for accounts, tickets, and audit trails
│   ├── services\
│   │   ├── cbsMockService.js         # Core Banking System (CBS) simulation engine
│   │   └── verificationService.js    # Simulated AI/OCR & biometric liveness scoring engine
│   └── server.js                     # Express API server with RBAC & Four-Eyes validation
├── public\
│   ├── index.html                    # Responsive single-page application (Mobile & Desktop)
│   ├── styles.css                    # Professional banking UI stylesheet
│   └── app.js                        # Client-side state manager and dynamic view renderer
├── tests\
│   └── api.test.js                   # Automated test script verifying complete recovery lifecycle
└── package.json                      # Project manifest and execution scripts
```

---

## 3. Step-by-Step Prototype Build Sequence

### Phase 1: Project Initialization & Dependency Configuration
- Initialize `package.json` with scripts: `start` and `test`.
- Install lightweight, highly reliable dependencies: `express` (routing), `cors` (cross-origin access), `multer` (file handling).

### Phase 2: Mock Core Banking System (CBS) & Data Store
- Build `src/data/seedData.js` with realistic test accounts representing all six restriction categories:
  - Account 1001: John Doe — `DORMANT_INACTIVE` ($14,250.00)
  - Account 1002: Elena Rostova — `KYC_EXPIRED` ($5,800.50)
  - Account 1003: Marcus Vance — `AML_SUSPICIOUS_TXN` ($84,000.00)
  - Account 1004: Priya Patel — `SECURITY_COMPROMISED` ($1,920.00)
  - Account 1005: Apex Logistics LLC — `COURT_ATTACHMENT_LIEN` ($42,100.00)
  - Account 1006: David Kim — `OVERDRAFT_LIEN_HOLD` (-$350.00)
  - Account 1000: Sarah Connor — `ACTIVE` ($22,500.00 baseline control)
- Build `src/data/dataStore.js` with transactional read/write, ticket creation, state transitions, audit logging, and factory reset.
- Build `src/services/cbsMockService.js` to simulate CBS hold queries, freeze status, and hold releases with simulated latency and reference IDs.
- Build `src/services/verificationService.js` to simulate OCR confidence extraction and facial biometric match scoring.

### Phase 3: Express REST API Implementation
Implement the following endpoint groups:
1. **Public / Session Endpoints:**
   - `GET /api/session/roles` — Returns available roles and active test credentials.
   - `POST /api/session/reset` — Resets mock database to clean factory seed state.
2. **Customer Endpoints:**
   - `GET /api/customer/account/:accountNumber` — Retrieves account diagnosis, restriction reason, and required tasks.
   - `POST /api/customer/recovery/submit` — Submits identity, document, selfie, and explanation; creates ticket.
   - `GET /api/customer/recovery/ticket/:ticketId` — Retrieves real-time ticket timeline status.
3. **Bank Reviewer (Maker) Endpoints:**
   - `GET /api/reviewer/cases` — Lists tickets awaiting L1 review.
   - `POST /api/reviewer/case/:ticketId/claim` — Claims a ticket to avoid reviewer collisions.
   - `POST /api/reviewer/case/:ticketId/action` — Records compliance notes and recommends approval or rejection.
4. **Bank Approver (Checker) Endpoints:**
   - `GET /api/approver/cases` — Lists tickets awaiting L2 dual authorization.
   - `POST /api/approver/case/:ticketId/authorize` — Enforces Four-Eyes principle and executes CBS unfreeze.
5. **System Administrator Endpoints:**
   - `GET /api/admin/audit-logs` — Immutable audit trail with actor, action, timestamp, and details.
   - `GET /api/admin/categories` — Configuration of all 6 restriction rules and SLA thresholds.
   - `GET /api/admin/cbs-status` — Health and latency metrics of the simulated Core Banking connector.

### Phase 4: Omni-Channel Frontend Experience
- Create responsive HTML5/CSS3/Vanilla JS UI with zero build step (runs instantly in any browser).
- Implement:
  1. **Top Control Bar:** Fast role switching (Customer, Reviewer, Approver, Admin), Reset Demo State button, and Mobile Viewport Toggle button.
  2. **Customer View:**
     - Toggle between iPhone/Android mobile device frame and expanded responsive desktop mode.
     - Quick Account Selector dropdown to instantly inspect different restriction categories.
     - Urgent Account Restriction banner with breakdown of blocked actions.
     - Multi-step interactive Recovery Wizard (Diagnostic -> Liveness Capture -> Document Upload -> Review & Sign).
     - Live Timeline Tracker showing progression from `Submitted` to `Under Review` to `Restored`.
  3. **Bank Reviewer Cockpit (Maker):**
     - Case queue table with severity badges.
     - Deep-dive inspection modal showing uploaded documents alongside simulated Core Banking baseline data.
     - Automated OCR and biometric score cards.
     - Reviewer decision actions ("Recommend Approval", "Request More Info", "Reject").
  4. **Bank Approver Cockpit (Checker):**
     - Four-Eyes authorization queue.
     - Enforcement indicator preventing self-approval by Maker.
     - One-click "Authorize & Release CBS Hold" with real-time CBS log output.
  5. **Admin Console:**
     - Real-time audit log stream.
     - Restriction category policy editor.
     - CBS connector simulator dashboard.

### Phase 5: Verification & End-to-End Testing
- Write and run `tests/api.test.js` validating:
  - Account diagnostic fetching.
  - Recovery ticket submission.
  - Reviewer claim and recommendation.
  - Four-Eyes segregation (ensuring Reviewer cannot approve their own case).
  - Approver authorization and successful CBS hold release.
  - Verification that the account status in Core Banking transitions from `FROZEN`/`RESTRICTED` to `ACTIVE`.
