const express = require('express');
const { getOtpByEmail } = require('../controller/Forgotpassword');

const forgot = express.Router();

forgot.post('/', getOtpByEmail);

module.exports = forgot;