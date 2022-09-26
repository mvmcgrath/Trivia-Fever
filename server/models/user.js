const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    required: true,
    validate: {
      validator: (n) => /^\w+$/.test(n),
      message: 'Username must consist only of numbers, letters, and underscores.',
    },
  },
  correctAnswers: {
    type: Number,
    required: true
  },
  gamesPlayed: {
    type: Number,
    required: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)