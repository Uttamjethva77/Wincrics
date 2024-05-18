const express = require('express');
const BlogsController = require('../controller/blogscontroller');
const { logAnalytics } = require('../middelwear/analytics')
const { authenticateToken } = require('../middelwear/authenticate');
const blogsRoute = express.Router();
// Middleware to log analytics data for all routes
blogsRoute.use(logAnalytics);

// Create a new blog
blogsRoute.post('/',BlogsController.create);

// Get all blogs
blogsRoute.get('/',BlogsController.getAll);

// Get a blog by ID
blogsRoute.get('/:id',BlogsController.getById);

// Update a blog by ID
blogsRoute.put('/:id',BlogsController.update);

// Delete a blog by ID
blogsRoute.delete('/:id', BlogsController.delete);

module.exports = blogsRoute;
