const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('questions')
  response.json(users)
})

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!(username && password)) {
    return response.status(400).json({
      error: 'Username and password must be provided'
    })
  }

  if (password.length < 3) {
    return response.status(400).json({
      error: 'Password must have a minimum length of 3'
    })
  }

  if (!(/^[\w]+$/.test(password))) {
    return response.status(400).json({
      error: 'Password must only consist of letters and numbers'
    })
  }

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'Username must be unique'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
    correctAnswers: 0,
    gamesPlayed: 0
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = userRouter