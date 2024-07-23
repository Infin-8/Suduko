const { getQuestions } = require("./store")
const rl = require('./cli')
const { answered } = require('./emitter')
const [first] = getQuestions()

rl.question(first, answered)