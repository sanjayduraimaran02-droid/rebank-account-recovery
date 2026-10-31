const { all, get } = require('../db/database');

/**
 * Retrieves audit logs with optional filters and pagination
 */
function getAuditLogs({ limit = 100, offset = 0, actorRole, action, entityType }) {
  let query = `
    SELECT a.*, u.full_name as actor_name, u.email as actor_email
    FROM audit_events a
    LEFT JOIN users u ON a.actor_id = u.id
    WHERE 1=1
  `;
  const params = [];

  if (actorRole) {
    query += ` AND a.actor_role = ?`;
    params.push(actorRole);
  }

  if (action) {
    query += ` AND a.action LIKE ?`;
    params.push(`%${action}%`);
  }

  if (entityType) {
    query += ` AND a.entity_type = ?`;
    params.push(entityType);
  }

  query += ` ORDER BY a.timestamp DESC LIMIT ? OFFSET ?`;
  params.push(Number(limit), Number(offset));

  const rows = all(query, params);

  return rows.map(r => {
    let parsedDetails = null;
    if (r.details) {
      try {
        parsedDetails = JSON.parse(r.details);
      } catch (e) {
        parsedDetails = r.details;
      }
    }
    return {
      ...r,
      details: parsedDetails
    };
  });
}

module.exports = {
  getAuditLogs
};
