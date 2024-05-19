const express = require('express');
const { userLogin } = require('../controller/UserLogin');

const userLog = express.Router();

userLog.post('/', userLogin);

module.exports = userLog;