const express = require('express');
const ContactUsController = require('../controller/contactus');
const { authenticateToken } = require('../middelwear/authenticate');
const { logAnalytics } = require('../middelwear/analytics');

const contactUsRoute = express.Router();

contactUsRoute.use(logAnalytics);
// contactUsRoute.use(authenticateToken);

// Create a new contact
contactUsRoute.post('/', ContactUsController.create);

// Get all contacts
contactUsRoute.get('/', ContactUsController.getAll);

// Get a contact by ID
contactUsRoute.get('/:id', ContactUsController.getById);

// Update a contact by ID
contactUsRoute.put('/:id', ContactUsController.update);

// Delete a contact by ID
contactUsRoute.delete('/:id', ContactUsController.delete);

module.exports = contactUsRoute;
