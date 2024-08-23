const generateBoard = require('./generateBoard')
const setDifficulty = require('./setDifficulty')
const axios = require('axios')
const { getCount, addBoard } = require('./store')

module.exports = async ([num, difficulty], emitter) => {

    emitter.emit('generate')

    while (getCount() < parseInt(num)) {

        try {

            let suduko = await generateBoard(emitter)

            addBoard(suduko)

            const { matrix, timestamp } = suduko

            const payload = {
                matrix: JSON.stringify(matrix),
                mapped: setDifficulty(matrix, difficulty),
                completed: false,
                playing: false,
                playingSince: 0,
                difficulty: difficulty.trim(),
                timestamp
            }

            await axios.post("http://localhost:8000/boards/newBoard", payload)

        } catch (e) { console.log(e) }

    }

    emitter.emit("complete")
}