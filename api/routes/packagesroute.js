const express = require('express');
const PackageController = require('../controller/packagescontroller');
const { logAnalytics } = require('../middelwear/analytics')
const { authenticateToken } = require('../middelwear/authenticate');
const packagesRoute = express.Router();
// Middleware to log analytics data for all routes
packagesRoute.use(logAnalytics);
// packagesRoute.use(authenticateToken);
// Create a new package
packagesRoute.post('/',PackageController.create);

// Get all packages
packagesRoute.get('/',PackageController.getAll);

// Get a package by ID
packagesRoute.get('/:id',PackageController.getById);

// Update a package by ID
packagesRoute.put('/:id',PackageController.update);

// Delete a package by ID
packagesRoute.delete('/:id',PackageController.delete);

module.exports = packagesRoute;
