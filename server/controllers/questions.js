const questionRouter = require('express').Router()
const Question = require('../models/question')
const middleware = require('../utils/middleware')

questionRouter.get('/', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
  const questions = await Question.find({ user: request.user._id })
  response.json(questions)
})

questionRouter.get('/all', async (request, response) => {
  const questions = await Question.find({})
  response.json(questions)
})

questionRouter.post('/', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user

  if (user.questions.length >= 50) {
    return response.status(400).json({
      error: 'Too many questions exist. Please delete some questions and try again.'
    })
  }

  const question = new Question({
    question: body.question,
    category: body.category,
    difficulty: body.difficulty,
    correct_answer: body.correct_answer,
    incorrect_answers: body.incorrect_answers,
    user: user._id
  })

  const result = await question.save()

  user.questions = user.questions.concat(result._id)
  await user.save()

  return response.status(201).json(result)
})

questionRouter.delete('/:id', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
  const question = await Question.findById(request.params.id)
  if (!question) {
    response.status(204).end()
  } else if (question.user.toString() === request.user._id.toString()) {
    await Question.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).json({
      error: 'Must be creator of question'
    })
  }
})

questionRouter.put('/:id', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
  const body = request.body

  const question = {
    question: body.question,
    category: body.category,
    difficulty: body.difficulty,
    correct_answer: body.correct_answer,
    incorrect_answers: body.incorrect_answers
  }

  const existingQuestion = await Question.findById(request.params.id)

  if (!existingQuestion) {
    return response.status(404).json({
      error: 'Question not found'
    })
  }

  if (request.user._id.toString() === existingQuestion.user.toString()) {
    const updatedQuestion = await Question.findByIdAndUpdate(request.params.id, question, { new: true, runValidators: true })
    response.json(updatedQuestion)
  } else {
    return response.status(401).json({
      error: 'Must be creator of question'
    })
  }
})

module.exports = questionRouter
