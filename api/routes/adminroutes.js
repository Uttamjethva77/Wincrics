const express = require('express');
const { logAnalytics } = require('../middelwear/analytics')
const AdminController = require('../controller/AdminController');
const { authenticateToken } = require('../middelwear/authenticate');

const adminRoute = express.Router();

// Middleware to log analytics data for all routes
adminRoute.use(logAnalytics);

// Create a new admin
adminRoute.post('/', authenticateToken,AdminController.create);

// Get all admins
adminRoute.get('/', authenticateToken,AdminController.getAll);

// Get an admin by ID
adminRoute.get('/:id', authenticateToken,AdminController.getById);

// Update an admin by ID
adminRoute.put('/:id', authenticateToken,AdminController.update);

// Delete an admin by ID
adminRoute.delete('/:id', authenticateToken,AdminController.delete);


module.exports = adminRoute;
