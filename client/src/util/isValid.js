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


export default isValid