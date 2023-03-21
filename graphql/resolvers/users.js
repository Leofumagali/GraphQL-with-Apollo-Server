const bcrypt = require('bcryptjs'),
      generateToken = require('../../helpers/tokenGenerator'),
      validator = require('validator')
const { UserInputError } = require('apollo-server')
const User = require('../../models/User')

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      // Validate input data
      if(validator.isEmpty(username) || validator.isEmpty(password)) {
        throw new UserInputError('Username or password must not be empty.', {
          errors: {
            emptyData: 'Username or password must not be empty.'
          }
        })
      }

      // Confirm if user exists
      const user = await User.findOne({ username })

      if(!user) {
        throw new UserInputError('Wrong credentials.', {
          errors: {
            emptyData: 'Invalid username or password.'
          }
        })
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password)

      if(!isPasswordCorrect) {
        throw new UserInputError('Wrong credentials.', {
          errors: {
            emptyData: 'Invalid username or password.'
          }
        })
      }

      const token = generateToken(user)

      return {
        ...user._doc,
        id: user._id,
        token
      }

    },

    async register(_, { registerInput: { username, email, password}}) {
      // Validate input data
      if(validator.isEmpty(username) || validator.isEmpty(email) || validator.isEmpty(password)) {
        throw new UserInputError('Username, email or password must not be empty.', {
          errors: {
            emptyData: 'Required data must not be empty.'
          }
        })
      }
      
      if(!validator.isEmail(email)) {
        throw new UserInputError('Not valid e-mail', {
          errors: {
            emptyData: 'E-mail must be a valid e-mail.'
          }
        })
      }

      // Confirm user does not exists
      const usernameExists = await User.findOne({ username })
      const emailExists = await User.findOne({ email })

      if(usernameExists) {
        throw new UserInputError('Username already being used.', {
          errors: {
            username: 'This username is already being used.'
          }
        })
      }

      if(emailExists) {
        throw new UserInputError('Email already being used.', {
          errors: {
            email: 'This email is already being used.'
          }
        })
      }

      // Encrypt password
      const salt = await bcrypt.genSalt(10)
      const encryptedPassword = await bcrypt.hash(password, salt)

      // Create and save new user
      const newUser = new User({
        email,
        username,
        password: encryptedPassword,
        createdAt: new Date().toISOString()
      })

      const savedUser = await newUser.save()

      let token = generateToken(savedUser)

      return {
        ...savedUser._doc,
        id: savedUser._id,
        token
      }
    }
  }
}