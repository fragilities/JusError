'use strict'

const crypto = require('crypto');

module.exports = function hashPassword(password, secret) {

  return crypto.createHmac('sha256', secret)
    .update(password)
    .digest('hex');
}