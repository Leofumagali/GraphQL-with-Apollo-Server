const jwt = require('jsonwebtoken'),
      { SECRET_KEY } = require('../config')

const generateToken = user => {
  return jwt.sign({
    id: user.id,
    username: user.username
  },
    SECRET_KEY, 
  {
    expiresIn: '4h'
  })
}

module.exports = generateToken