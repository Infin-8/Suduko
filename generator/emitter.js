module.exports = (function () {

    const { getQuestions, getAnswers, submitAnswer, getCount } = require('./store')
    const rl = require('./cli')
    const { EventEmitter } = require("events")
    const create = require("./create")
    const emitter = new EventEmitter()

    const answered = answer => emitter.emit('answer', answer)

    emitter.on("answer", answer => {

        submitAnswer(answer)

        let questions = getQuestions(),
            answers = getAnswers()

        if (answers.length < questions.length) {
            rl.question(questions[answers.length], answered)
        } else {
            create(answers, emitter)
        }
    })

    emitter.on("next_value", matrix => {

        let length = matrix.flat().length

        process.stdout.clearLine()
        process.stdout.cursorTo(0)
        process.stdout.write(`...creating board ${getCount() + 1} => ${Math.round((length / 81) * 100)}% complete`)
    })

    emitter.on('generate', () => {
        process.stdout.clearLine()
        process.stdout.cursorTo(0)
        process.stdout.write(`\n`)
    })

    emitter.on('complete', () => {
        process.stdout.clearLine()
        process.stdout.cursorTo(0)
        process.stdout.write(`Boards Complete \n\nBoard Count => ${getCount()}\n\n`)
        process.exit()
    })

    return { answered }

})()



