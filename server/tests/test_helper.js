const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const Question = require('../models/question')
const User = require('../models/user')

const initialQuestions = [
  {
    'category': 'Entertainment: Film',
    'type': 'multiple',
    'difficulty': 'easy',
    'question': 'Who starred as Bruce Wayne and Batman in Tim Burtons 1989 movie Batman?',
    'correct_answer': 'Michael Keaton',
    'incorrect_answers': [
      'George Clooney',
      'Val Kilmer',
      'Adam West'
    ]
  },
  {
    'category': 'Geography',
    'type': 'multiple',
    'difficulty': 'medium',
    'question': 'What is the capital of Chile?',
    'correct_answer': 'Santiago',
    'incorrect_answers': [
      'Valparaiacuteso',
      'Copiapoacute',
      'Antofasta'
    ]
  },
  {
    'category': 'History',
    'type': 'multiple',
    'difficulty': 'easy',
    'question': 'The original Roman alphabet lacked the following letters EXCEPT?',
    'correct_answer': 'X',
    'incorrect_answers': [
      'W',
      'U',
      'J'
    ]
  },
  {
    'category': 'Entertainment: Video Games',
    'type': 'multiple',
    'difficulty': 'easy',
    'question': 'When was Minecraft first released to the public?',
    'correct_answer': 'May 17th 2009',
    'incorrect_answers': [
      'September 17th 2009',
      'November 18th 2011',
      'October 7th 2011'
    ]
  },
  {
    'category': 'Entertainment: Video Games',
    'type': 'multiple',
    'difficulty': 'medium',
    'question': 'One of the early prototypes of the Sega Dreamcast controller resembled which of the following?',
    'correct_answer': 'Television Remote',
    'incorrect_answers': [
      'Tablet',
      'Hairdryer',
      'Flip Phone'
    ]
  },
  {
    'category': 'Entertainment: Video Games',
    'type': 'multiple',
    'difficulty': 'medium',
    'question': 'Which of these is NOT a game under the Worms series?',
    'correct_answer': 'Major Malfunction',
    'incorrect_answers': [
      'Crazy Golf',
      'Clan Wars',
      'Ultimate Mayhem'
    ]
  },
  {
    'category': 'General Knowledge',
    'type': 'multiple',
    'difficulty': 'easy',
    'question': 'What is the Zodiac symbol for Gemini?',
    'correct_answer': 'Twins',
    'incorrect_answers': [
      'Fish',
      'Scales',
      'Maiden'
    ]
  },
  {
    'category': 'Entertainment: Music',
    'type': 'multiple',
    'difficulty': 'medium',
    'question': 'Which novelty band was best known for their UK chart hits Combine Harvester and I Am a Cider Drinker in 1976?',
    'correct_answer': 'The Wurzels',
    'incorrect_answers': [
      'Goldie Lookin Chain',
      'Bonzo Dog DooDah Band',
      'The Firm'
    ]
  },
  {
    'category': 'General Knowledge',
    'type': 'multiple',
    'difficulty': 'medium',
    'question': 'The Fields Medal one of the most sought after awards in mathematics is awarded every how many years?',
    'correct_answer': '4',
    'incorrect_answers': [
      '3',
      '5',
      '6'
    ]
  },
  {
    'category': 'Entertainment: Comics',
    'type': 'multiple',
    'difficulty': 'easy',
    'question': 'In Homestuck the Kingdom of Darkness is also known as?',
    'correct_answer': 'Derse',
    'incorrect_answers': [
      'Skaia',
      'Prospit',
      'The Medium'
    ]
  }
]

const initialUsers = [
  {
    username: 'lipsum',
    correctAnswers: 2,
    gamesPlayed: 3,
    password: 'extremelysecurepassword'
  },
  {
    username: 'testuser',
    correctAnswers: 0,
    gamesPlayed: 0,
    password: 'verysecurepassword'
  }
]

const validQuestion = {
  question: 'Does this test work?',
  difficulty: 'easy',
  category: 'General Knowledge',
  correct_answer: 'Yes',
  incorrect_answers: [
    'No',
    'Maybe',
    'Possibly'
  ]
}


const invalidQuestion = {
  question: 'This is not a question!',
  difficulty: 'easy',
  category: 'General Knowledge',
  correct_answer: 'Yes',
  incorrect_answers: [
    'No',
    'Maybe',
    'Possibly'
  ]
}

const questionsInDb = async () => {
  const questions = await Question.find({})
  return questions.map(q => q.toJSON())
}

const addManyQuestions = async () => {
  const user = await User.findOne({ username: 'lipsum' })

  const newQuestions = initialQuestions
    .concat(initialQuestions.slice(0))
    .concat(initialQuestions.slice(0))
    .concat(initialQuestions.slice(0))

  const questionObjects = newQuestions
    .map(question => new Question({ ...question, user: user._id}))
  const questionPromiseArray = questionObjects.map(question => question.save())
  const results = await Promise.all(questionPromiseArray)

  user.questions = user.questions.concat(results.map(q => q._id))
  await user.save()
}

const getToken = (user) => {
  const userForToken = {
    username: user.username,
    id: user._id,
    gamesPlayed: user.gamesPlayed,
    correctAnswers: user.correctAnswers
  }

  return jwt.sign(userForToken, config.SECRET)
}



module.exports = {
  initialUsers,
  initialQuestions,
  validQuestion,
  invalidQuestion,
  questionsInDb,
  addManyQuestions,
  getToken
}