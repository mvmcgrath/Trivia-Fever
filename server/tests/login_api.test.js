const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

const api = supertest(app)
const tokens = {}

beforeEach(async () => {
  await User.deleteMany({})

  // Complicated way of hashing the password of each user object
  const unformattedUserObjects = helper.initialUsers
    .map(user => {
      return { ...user, 'password': bcrypt.hash(user.password, 10) }
    })
  const passwordArray = unformattedUserObjects.map(u => u.password)
  const passwordHashes = await Promise.all(passwordArray)

  const userObjects = unformattedUserObjects.map((user, i) => new User({
    username: user.username,
    correctAnswers: user.correctAnswers,
    gamesPlayed: user.gamesPlayed,
    passwordHash: passwordHashes[i]
  }))

  const userPromiseArray = userObjects.map(user => user.save())
  const savedUsers = await Promise.all(userPromiseArray)

  savedUsers.forEach(u => tokens[u.username] = helper.getToken(u))
})

describe('Logging in', () => {
  test('Login is successful with valid username and password', async () => {
    const userToLogin = helper.initialUsers[0]

    const response = await api
      .post('/api/login')
      .send(userToLogin)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.token).toBeDefined()
  })

  test('Login is unsuccessful with invalid username and password', async () => {
    await api
      .post('/api/login')
      .send(helper.validUser)
      .expect(401)
  })
})

afterAll(() => {
  mongoose.connection.close()
})