const express = require('express');
const { updatePasswordByEmail } = require('../controller/updatepassword');

const updatepassword = express.Router();

updatepassword.post('/', updatePasswordByEmail);

module.exports = updatepassword