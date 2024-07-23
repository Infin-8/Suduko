const store = (function () {

    let boards = []

    let questions = [
        "\nHow many boards do you want to generate?\n > ",
        "What difficulty? (easy, medium, or hard)\n > "
    ]

    let answers = []

    const submitAnswer = answer => answers.push(answer)

    const getAnswers = () => answers

    const getQuestions = () => questions

    const getBoards = () => boards

    const addBoard = matrix => boards.push(matrix)

    const getCount = () => boards.length

    return { getBoards, addBoard, getCount, getAnswers, getQuestions, submitAnswer }

})()

module.exports = store