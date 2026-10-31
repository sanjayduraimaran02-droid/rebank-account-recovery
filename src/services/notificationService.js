const { get, all, run } = require('../db/database');
const crypto = require('crypto');

/**
 * Creates and delivers a notification
 */
function createNotification({ userId, title, message, type = 'INFO', deliveryChannel = 'IN_APP', metadata = null }) {
  const id = 'notif-' + crypto.randomUUID();
  const now = new Date().toISOString();

  run(
    `INSERT INTO notifications (id, user_id, title, message, type, read_status, delivery_channel, metadata, created_at)
     VALUES (?, ?, ?, ?, ?, 0, ?, ?, ?)`,
    [id, userId, title, message, type, deliveryChannel, metadata ? JSON.stringify(metadata) : null, now]
  );

  return get('SELECT * FROM notifications WHERE id = ?', [id]);
}

/**
 * Retrieves notifications for a specific user
 */
function getUserNotifications(userId) {
  return all(
    'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 50',
    [userId]
  );
}

/**
 * Marks a notification as read
 */
function markAsRead(notificationId, userId) {
  run(
    'UPDATE notifications SET read_status = 1 WHERE id = ? AND user_id = ?',
    [notificationId, userId]
  );
  return get('SELECT * FROM notifications WHERE id = ?', [notificationId]);
}

/**
 * Marks all notifications for a user as read
 */
function markAllAsRead(userId) {
  run('UPDATE notifications SET read_status = 1 WHERE user_id = ?', [userId]);
  return { success: true };
}

module.exports = {
  createNotification,
  getUserNotifications,
  markAsRead,
  markAllAsRead
};
