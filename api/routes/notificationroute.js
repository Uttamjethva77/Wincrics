const express = require('express');
const NotificationController = require('../controller/notification');
const { logAnalytics } = require('../middelwear/analytics');
const notificationRoute = express.Router();
const { authenticateToken } = require('../middelwear/authenticate');
notificationRoute.use(logAnalytics);
notificationRoute.use(authenticateToken);

// Create a new notification
notificationRoute.post('/', NotificationController.create);

// Get all notifications
notificationRoute.get('/', NotificationController.getAll);

// Get a notification by ID
notificationRoute.get('/:id', NotificationController.getById);

// Update a notification by ID
notificationRoute.put('/:id', NotificationController.update);

// Delete a notification by ID
notificationRoute.delete('/:id', NotificationController.delete);

module.exports = notificationRoute;
