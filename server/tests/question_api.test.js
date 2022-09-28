const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const Question = require('../models/question')
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

  const user = savedUsers.find(({ username }) => username === 'lipsum')

  savedUsers.forEach(u => tokens[u.username] = helper.getToken(u))

  await Question.deleteMany({})

  const questionObjects = helper.initialQuestions
    .map(question => new Question({ ...question, user: user._id}))
  const questionPromiseArray = questionObjects.map(question => question.save())
  const results = await Promise.all(questionPromiseArray)

  user.questions = user.questions.concat(results.map(q => q._id))
  await user.save()
})

describe('Retrieving questions', () => {
  test('All user questions are retrieved', async () => {
    const response = await api
      .get('/api/questions/all')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.initialQuestions.length)
  })

  test('User questions retrieved contain correct data', async () => {
    const response = await api
      .get('/api/questions/all')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const questions = response.body.map(q => q.question)
    expect(questions).toContain('Who starred as Bruce Wayne and Batman in Tim Burtons 1989 movie Batman?')

    const correctAnswers = response.body.map(q => q.correct_answer)
    expect(correctAnswers).toContain('Michael Keaton')
  })

  describe('When logged in', () => {
    test('A user\'s questions with 10 questions are retrieved', async () => {
      const response = await api
        .get('/api/questions')
        .set('Authorization', `Bearer ${tokens['lipsum']}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(response.body).toHaveLength(helper.initialQuestions.length)
    })

    test('A user\'s questions with 0 questions are retrieved', async () => {
      const response = await api
        .get('/api/questions')
        .set('Authorization', `Bearer ${tokens['testuser']}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(response.body).toHaveLength(0)
    })

    test('A user\'s questions are not retrieved without valid authorization', async () => {
      await api
        .get('/api/questions')
        .expect(401)
    })
  })
})

describe('Adding questions', () => {
  test('A valid question can be added', async () => {
    await api
      .post('/api/questions')
      .send(helper.validQuestion)
      .set('Authorization', `Bearer ${tokens['lipsum']}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const questionsAfter = await helper.questionsInDb()

    expect(questionsAfter).toHaveLength(helper.initialQuestions.length + 1)

    const questions = questionsAfter.map(q => q.question)
    expect(questions).toContain('Does this test work?')

    const correctAnswers = questionsAfter.map(q => q.correct_answer)
    expect(correctAnswers).toContain('Yes')
  })

  test('An invalid question cannot be added', async () => {
    await api
      .post('/api/questions')
      .send(helper.invalidQuestion)
      .set('Authorization', `Bearer ${tokens['lipsum']}`)
      .expect(400)

    const questionsAfter = await helper.questionsInDb()

    expect(questionsAfter).toHaveLength(helper.initialQuestions.length)
  })

  test('A user can not create more than 50 questions', async () => {
    await helper.addManyQuestions()

    await api
      .post('/api/questions')
      .send(helper.validQuestion)
      .set('Authorization', `Bearer ${tokens['lipsum']}`)
      .expect(400)

    const questionsAfter = await helper.questionsInDb()

    expect(questionsAfter).toHaveLength(50)
  })
})

describe('Deleting questions', () => {
  test('A question with a valid id can be deleted', async () => {
    const questionsAtStart = await helper.questionsInDb()
    const questionToDelete = questionsAtStart[0]

    await api
      .delete(`/api/questions/${questionToDelete.id}`)
      .set('Authorization', `Bearer ${tokens['lipsum']}`)
      .expect(204)

    const questionsAfter = await helper.questionsInDb()

    expect(questionsAfter).toHaveLength(helper.initialQuestions.length - 1)

    const questions = questionsAfter.map(q => q.question)
    expect(questions).not.toContain(questionToDelete.question)
  })

  test('A question with an invalid id can be deleted', async () => {
    const wrongId = mongoose.Types.ObjectId(0)

    await api
      .delete(`/api/questions/${wrongId}`)
      .set('Authorization', `Bearer ${tokens['lipsum']}`)
      .expect(204)

    const questionsAfter = await helper.questionsInDb()

    expect(questionsAfter).toHaveLength(helper.initialQuestions.length)
  })

  test('A question cannot be deleted without valid authorization', async () => {
    const questionsAtStart = await helper.questionsInDb()
    const questionToDelete = questionsAtStart[0]

    await api
      .delete(`/api/questions/${questionToDelete.id}`)
      .expect(401)

    const questionsAfter = await helper.questionsInDb()

    expect(questionsAfter).toHaveLength(helper.initialQuestions.length)

    const questions = questionsAfter.map(q => q.question)
    expect(questions).toContain(questionToDelete.question)
  })

  test('A question cannot be deleted without belonging to the user', async () => {
    const questionsAtStart = await helper.questionsInDb()
    const questionToDelete = questionsAtStart[0]

    await api
      .delete(`/api/questions/${questionToDelete.id}`)
      .set('Authorization', `Bearer ${tokens['testuser']}`)
      .expect(401)

    const questionsAfter = await helper.questionsInDb()

    expect(questionsAfter).toHaveLength(helper.initialQuestions.length)

    const questions = questionsAfter.map(q => q.question)
    expect(questions).toContain(questionToDelete.question)
  })
})

describe('Updating questions', () => {
  test('A question with valid data can be updated', async () => {
    const questionsAtStart = await helper.questionsInDb()
    const questionToUpdate = questionsAtStart[0]

    const updatedQuestion = await api
      .put(`/api/questions/${questionToUpdate.id}`)
      .send(helper.validQuestion)
      .set('Authorization', `Bearer ${tokens['lipsum']}`)
      .expect(200)

    const questionsAfter = await helper.questionsInDb()

    expect(questionsAfter).toHaveLength(helper.initialQuestions.length)

    expect(updatedQuestion).not.toEqual(questionToUpdate)
  })

  test('A question with invalid data cannot be updated', async () => {
    const questionsAtStart = await helper.questionsInDb()
    const questionToUpdate = questionsAtStart[0]

    await api
      .put(`/api/questions/${questionToUpdate.id}`)
      .send(helper.invalidQuestion)
      .set('Authorization', `Bearer ${tokens['lipsum']}`)
      .expect(400)

    const questionsAfter = await helper.questionsInDb()

    expect(questionsAfter).toHaveLength(helper.initialQuestions.length)
  })

  test('A question cannot be updated without valid authorization', async () => {
    const questionsAtStart = await helper.questionsInDb()
    const questionToUpdate = questionsAtStart[0]

    await api
      .put(`/api/questions/${questionToUpdate.id}`)
      .send(helper.validQuestion)
      .expect(401)

    const questionsAfter = await helper.questionsInDb()

    expect(questionsAfter).toHaveLength(helper.initialQuestions.length)
  })

  test('A question cannot be updated without belonging to the user', async () => {
    const questionsAtStart = await helper.questionsInDb()
    const questionToUpdate = questionsAtStart[0]

    await api
      .put(`/api/questions/${questionToUpdate.id}`)
      .send(helper.validQuestion)
      .set('Authorization', `Bearer ${tokens['testuser']}`)
      .expect(401)

    const questionsAfter = await helper.questionsInDb()

    expect(questionsAfter).toHaveLength(helper.initialQuestions.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})