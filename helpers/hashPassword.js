'use strict'

const crypto = require('crypto');

module.exports = function hashPassword(password, secret) {

  const hash = crypto.createHmac('sha256', secret)
                .update(password)
                .digest('hex');
  return hash;
}