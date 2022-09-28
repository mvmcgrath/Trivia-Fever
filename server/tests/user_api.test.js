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

describe('Retrieving users', () => {
  test('All users are retrieved', async () => {
    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.initialUsers.length)
  })
})

describe('Adding users', () => {
  test('A valid user can be added', async () => {
    await api
      .post('/api/users')
      .send(helper.validUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAfter = await helper.usersInDb()

    expect(usersAfter).toHaveLength(helper.initialUsers.length + 1)

    const usernames = usersAfter.map(u => u.username)
    expect(usernames).toContain('newuser')
  })

  test('A user with missing password and username is not added', async () => {
    await api
      .post('/api/users')
      .send(helper.invalidUserMissing)
      .expect(400)

    const usersAfter = await helper.usersInDb()

    expect(usersAfter).toHaveLength(helper.initialUsers.length)
  })

  test('A user with a too short password is not added', async () => {
    await api
      .post('/api/users')
      .send(helper.invalidUserShortPassword)
      .expect(400)

    const usersAfter = await helper.usersInDb()

    expect(usersAfter).toHaveLength(helper.initialUsers.length)
  })

  test('A user with invalid password characters is not added', async () => {
    await api
      .post('/api/users')
      .send(helper.invalidUserBadPassword)
      .expect(400)

    const usersAfter = await helper.usersInDb()

    expect(usersAfter).toHaveLength(helper.initialUsers.length)
  })

  test('A user with a username that already exists is not added', async () => {
    await api
      .post('/api/users')
      .send(helper.invalidUserExists)
      .expect(400)

    const usersAfter = await helper.usersInDb()

    expect(usersAfter).toHaveLength(helper.initialUsers.length)
  })
})

describe('Updating users', () => {
  test('A user is updated with valid data', async () => {
    const userToUpdate = await User.find({ username: 'lipsum' })

    const updatedUser = await api
      .put('/api/users/')
      .send(helper.validUserUpdate)
      .set('Authorization', `Bearer ${tokens['lipsum']}`)
      .expect(200)

    const usersAfter = await helper.usersInDb()

    expect(usersAfter).toHaveLength(helper.initialUsers.length)

    expect(updatedUser).not.toEqual(userToUpdate)
  })

  test('A user is not updated with invalid data', async () => {
    await api
      .put('/api/users/')
      .send(helper.invalidUserUpdate)
      .set('Authorization', `Bearer ${tokens['lipsum']}`)
      .expect(400)

    const usersAfter = await helper.usersInDb()

    expect(usersAfter).toHaveLength(helper.initialUsers.length)
  })

  test('A user is not updated with invalid authorization', async () => {
    await api
      .put('/api/users/')
      .send(helper.validUserUpdate)
      .expect(401)

    const usersAfter = await helper.usersInDb()

    expect(usersAfter).toHaveLength(helper.initialUsers.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})