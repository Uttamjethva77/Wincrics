const express = require('express');
const UserController = require('../controller/userscontroller');
const { logAnalytics } = require('../middelwear/analytics')
const { authenticateTokenn } = require('../middelwear/auth');
const usersroute = express.Router();
usersroute.use(logAnalytics);
// Create a new user
usersroute.post('/',authenticateTokenn,UserController.create);

// Get all users
usersroute.get('/',authenticateTokenn,UserController.getAll);

// Get a user by ID
usersroute.get('/:id',authenticateTokenn,UserController.getById);

// Update a user by ID
usersroute.put('/:id',authenticateTokenn,UserController.update);

// Delete a user by ID
usersroute.delete('/:id',authenticateTokenn,UserController.delete);

module.exports = usersroute;
