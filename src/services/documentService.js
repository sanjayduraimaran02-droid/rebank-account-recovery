const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const { run, get } = require('../db/database');
const { recordAudit } = require('../middleware/auditLogger');

const UPLOADS_DIR = path.join(__dirname, '..', '..', 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOADS_DIR);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${crypto.randomBytes(6).toString('hex')}${ext}`;
    cb(null, uniqueName);
  }
});

// File filter (accept images & PDFs only, max 10MB)
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, WEBP, and PDF documents are accepted.'), false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter
});

/**
 * Simulates intelligent AI/OCR analysis of uploaded document
 */
function simulateOcrAnalysis(documentType, fileName) {
  let ocrData = {};
  let ocrConfidence = 0.95 + Math.random() * 0.04;
  let faceMatchScore = null;

  switch (documentType) {
    case 'GOVT_ID':
      ocrData = {
        documentCategory: 'PASSPORT_OR_NATIONAL_ID',
        extractedName: 'MATCH_VERIFIED',
        documentIdNumber: 'ID-' + Math.floor(10000000 + Math.random() * 90000000),
        issuingCountry: 'USA',
        expirationDate: '2030-10-15',
        tamperIndicator: 'CLEAN'
      };
      break;

    case 'PROOF_OF_ADDRESS':
      ocrData = {
        documentCategory: 'UTILITY_STATEMENT',
        issuerName: 'Consolidated Energy & Water',
        issueDate: '2026-09-12',
        ageDays: 37,
        addressValidity: 'MATCH_PRIMARY_RESIDENCE'
      };
      ocrConfidence = 0.94 + Math.random() * 0.04;
      break;

    case 'SELFIE_LIVENESS':
      ocrData = {
        livenessCheck: 'PASS',
        antiSpoofing: 'PASSED_GENUINE_LIVE_USER',
        ambientLighting: 'OPTIMAL',
        blinkChallenge: 'CONFIRMED'
      };
      faceMatchScore = 0.93 + Math.random() * 0.06;
      break;

    case 'SOURCE_OF_FUNDS':
      ocrData = {
        documentCategory: 'COMMERCIAL_INVOICE_OR_TAX_FORM',
        declaredEntity: 'VERIFIED_CORP',
        invoiceAudit: 'AUTHENTICATED'
      };
      ocrConfidence = 0.91 + Math.random() * 0.05;
      break;

    default:
      ocrData = { note: 'Supporting evidence document processed.' };
  }

  return {
    ocrExtractedData: JSON.stringify(ocrData),
    ocrConfidenceScore: parseFloat(ocrConfidence.toFixed(2)),
    faceMatchScore: faceMatchScore ? parseFloat(faceMatchScore.toFixed(2)) : null
  };
}

/**
 * Stores document metadata and simulated OCR results in database
 */
function recordDocumentMetadata({ recoveryRequestId, documentType, file, simulatedData }) {
  const id = 'doc-' + crypto.randomUUID();
  const now = new Date().toISOString();

  let ocrData = simulatedData ? JSON.stringify(simulatedData) : null;
  let ocrConfidence = 0.95;
  let faceMatch = null;

  if (!simulatedData) {
    const analysis = simulateOcrAnalysis(documentType, file.originalname);
    ocrData = analysis.ocrExtractedData;
    ocrConfidence = analysis.ocrConfidenceScore;
    faceMatch = analysis.faceMatchScore;
  }

  const filePath = file.path;
  const fileUrl = `/uploads/${path.basename(file.path)}`;

  run(
    `INSERT INTO documents (
      id, recovery_request_id, document_type, file_name, mime_type, file_size,
      file_path, file_url, verification_status, ocr_extracted_data, ocr_confidence_score,
      face_match_score, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'VERIFIED', ?, ?, ?, ?)`,
    [
      id,
      recoveryRequestId,
      documentType,
      file.originalname,
      file.mimetype,
      file.size,
      filePath,
      fileUrl,
      ocrData,
      ocrConfidence,
      faceMatch,
      now
    ]
  );

  return get('SELECT * FROM documents WHERE id = ?', [id]);
}

module.exports = {
  upload,
  simulateOcrAnalysis,
  recordDocumentMetadata,
  UPLOADS_DIR
};
