const canContinue = require('./worker')

const generateBoard = async (emitter) => {

    let start = Date.now()

    let matrix = [],
        attempts = 0,
        restarts = 0,
        lowerbound = 4,
        upperbound = 9

    while (matrix.length < 9) {

        matrix.push([])

        let row = matrix[matrix.length - 1]
        attempts = 0
        restarts = 0

        while (row.length < 9) {

            if (matrix.length > 3 && matrix.length < 7 && restarts === lowerbound) {
                matrix.splice(3)
                break
            }

            if (matrix.length > 7 && restarts === upperbound) {
                matrix.splice(7)
                break
            }

            if (attempts === 9 ** 2) {
                matrix[matrix.length - 1] = []
                row = matrix[matrix.length - 1]
                attempts = 0
                restarts++
            }

            let random = Math.floor(Math.random() * 9 + 1)
            row.push(random)

            try {

                const result = await canContinue(matrix)

                if (!!result) {
                    emitter.emit("next_value", matrix)

                    continue
                } else {
                    row.splice(row.length - 1)
                    attempts++
                }
            }

            catch (error) { console.log("error", error) }
        }
    }

    let timestamp = Date.now() - start

    return { matrix, timestamp }
}

module.exports = generateBoard


