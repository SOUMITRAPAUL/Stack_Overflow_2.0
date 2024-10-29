const Notification = require('../models/Notification');

// Clean up notifications older than 24 hours
const cleanOldNotifications = async () => {
  const oldDate = new Date(Date.now() - 24 * 60 * 60 * 1000); // 1 day in milliseconds
  await Notification.deleteMany({ createdAt: { $lt: oldDate } });
};

// Run cleanup every 2 hours
setInterval(cleanOldNotifications, 2 * 60 * 60 * 1000);

module.exports = cleanOldNotifications;
