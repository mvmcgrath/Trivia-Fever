const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  difficulty: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true,
    minlength: 4,
    validate: {
      validator: (n) => /^[\w\s]+?$/.test(n),
      message: 'Question must consist only of numbers and letters, and end with a question mark.',
    },
  },
  correct_answer: {
    type: String,
    required: true,
    validate: {
      validator: (n) => /^[\w\s]+$/.test(n),
      message: 'Answers must consist only of numbers and letters',
    },
  },
  incorrect_answers: [
    {
      type: String,
      required: true,
      validate: {
        validator: (n) => /^[\w\s]+$/.test(n),
        message: 'Answers must consist only of numbers and letters',
      }
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

questionSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Question', questionSchema)