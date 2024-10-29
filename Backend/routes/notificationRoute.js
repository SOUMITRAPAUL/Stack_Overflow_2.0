const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const authMiddleware = require('../middleware/authMiddleware');

// Get notifications, excluding notifications created by the current user
router.get('/notification', authMiddleware, async (req, res) => {
  const userEmail = req.user.email; // Assuming req.user contains the logged-in user's data

  try {
    // Fetch notifications excluding those created by the current user
    const notifications = await Notification.find({ email: { $ne: userEmail } });

    if (notifications.length > 0) {
      res.status(200).json(notifications);
      console.log(notifications);
    } else {
      res.status(404).json({ message: 'No notifications found' });
      console.log('No notifications found');
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications' });
    console.error(error);
  }
});

module.exports = router;


