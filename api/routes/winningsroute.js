const express = require('express');
const WinningController = require('../controller/winnings');
const { logAnalytics } = require('../middelwear/analytics');
const { authenticateToken } = require('../middelwear/authenticate');
const winningRoute = express.Router();
winningRoute.use(logAnalytics);
// winningRoute.use(authenticateToken);

// Create a new winning
winningRoute.post('/', WinningController.create);

// Get all winnings
winningRoute.get('/', WinningController.getAll);

// Get a winning by ID
winningRoute.get('/:id', WinningController.getById);

// Update a winning by ID
winningRoute.put('/:id', WinningController.update);

// Delete a winning by ID
winningRoute.delete('/:id', WinningController.delete);

module.exports = winningRoute;
