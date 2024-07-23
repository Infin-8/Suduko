const makeCopy = matrix => JSON.parse(JSON.stringify(matrix))

const dupCheck = sub => sub
    .map((item, i, arr) => arr.indexOf(item) === i)
    .every(item => !!item)

const checkRow = (matrix = []) => {

    if (!matrix.length) return []

    for (let i = 0; i < matrix.length; i++) {
        if (!dupCheck(matrix[i])) return []
    }

    return matrix
}

const colToRow = matrix => {

    let row = [],
        result = []

    while (matrix.length) {

        if (row.length) {
            result.push(row)
            row = []
        }

        matrix.forEach((sub, i) => { if (!sub.length) matrix.splice(i, 1) })

        matrix.forEach((sub) => { row.push(...sub.splice(0, 1)) })

        matrix.forEach((sub, i) => { if (!sub.length) matrix.splice(i, 1) })
    }

    if (row.length) result.push(row)

    return result
}

const shortCircuit = matrix => matrix.some(sub => sub.length === 4 || sub.length === 7)

const squareToRow = matrix => {

    if (shortCircuit(matrix)) return matrix

    let row = [],
        result = []

    while (matrix.length) {

        if (row.length) {
            result.push(row)
            row = []
        }

        matrix.forEach((sub, i) => { if (!sub.length) matrix.splice(i, 1) })

        matrix.forEach((sub, i) => { if (i < 3) row.push(...sub.splice(0, 3)) })

        matrix.forEach((sub, i) => { if (!sub.length) matrix.splice(i, 1) })
    }

    if (row.length) result.push(row)
    
    return result
}

const result = matrix => matrix.length
    ? true
    : false

const compose = (...fns) => initial => fns
    .reduce((result, next) => next(result), initial)

const isValid = matrix =>
    compose(
        makeCopy,
        checkRow,
        colToRow,
        checkRow,
        squareToRow,
        checkRow,
        result,
    )(matrix)




// my first randomly generated suduko! 02-29-2024

// console.log(isValid([
//     [8, 7, 5, 4, 3, 6, 2, 9, 1],
//     [2, 1, 3, 5, 9, 8, 4, 6, 7],
//     [4, 6, 9, 7, 1, 2, 3, 5, 8],

//     [3, 9, 8, 1, 2, 7, 5, 4, 6],
//     [1, 4, 6, 8, 5, 9, 7, 3, 2],
//     [5, 2, 7, 6, 4, 3, 1, 8, 9],

//     [7, 3, 2, 9, 8, 4, 6, 1, 5],
//     [6, 8, 1, 3, 7, 5, 9, 2, 4],
//     [9, 5, 4, 2, 6, 1, 8, 7, 3],
// ]))



module.exports = isValid