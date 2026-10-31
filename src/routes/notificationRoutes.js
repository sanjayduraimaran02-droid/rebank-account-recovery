const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');
const { getUserNotifications, markAsRead, markAllAsRead } = require('../services/notificationService');

router.use(authenticate);

/**
 * Get all notifications for authenticated user
 */
router.get('/', (req, res) => {
  const list = getUserNotifications(req.user.id);
  res.json({
    success: true,
    data: list
  });
});

/**
 * Mark a single notification as read
 */
router.post('/:id/read', (req, res) => {
  const updated = markAsRead(req.params.id, req.user.id);
  res.json({
    success: true,
    data: updated
  });
});

/**
 * Mark all notifications as read
 */
router.post('/read-all', (req, res) => {
  markAllAsRead(req.user.id);
  res.json({
    success: true,
    message: 'All notifications marked as read'
  });
});

module.exports = router;
