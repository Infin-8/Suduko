export const compose = (...fns) => initial => fns
    .reduce((result, next) => next(result), initial)

export const getCurrentBoard = (arr, id) => arr.find(({ _id }) => _id === id)

export const getPath = ({ diff, id }) => `/boards/${diff}/${id}`

export const chooseNumber = (num, setter) => {

    switch (num) {
        case 1:
            setter(prev => ({ ...prev, one: [...prev.one].slice(1) }))
            break;
        case 2:
            setter(prev => ({ ...prev, two: [...prev.two].slice(1) }))
            break;
        case 3:
            setter(prev => ({ ...prev, three: [...prev.three].slice(1) }))
            break;
        case 4:
            setter(prev => ({ ...prev, four: [...prev.four].slice(1) }))
            break;
        case 5:
            setter(prev => ({ ...prev, five: [...prev.five].slice(1) }))
            break;
        case 6:
            setter(prev => ({ ...prev, six: [...prev.six].slice(1) }))
            break;
        case 7:
            setter(prev => ({ ...prev, seven: [...prev.seven].slice(1) }))
            break;
        case 8:
            setter(prev => ({ ...prev, eight: [...prev.eight].slice(1) }))
            break;
        case 9:
            setter(prev => ({ ...prev, nine: [...prev.nine].slice(1) }))
            break;
        default:
            return null
    }
}

export const getTools = numbers => [
    { value: 1, hasContext: numbers.one.length, key: "one" },
    { value: 2, hasContext: numbers.two.length, key: 'two' },
    { value: 3, hasContext: numbers.three.length, key: "three" },
    { value: 4, hasContext: numbers.four.length, key: "four" },
    { value: 5, hasContext: numbers.five.length, key: 'five' },
    { value: "✏", hasContext: true },
    { value: 6, hasContext: numbers.six.length, key: 'six' },
    { value: 7, hasContext: numbers.seven.length, key: 'seven' },
    { value: 8, hasContext: numbers.eight.length, key: "eight" },
    { value: 9, hasContext: numbers.nine.length, key: "nine" },
    { value: "↩", hasContext: true },
    { value: "🗑", hasContext: true }
]

export const getStartButtons = () => [
    { filter: "easy", color: "#b3ff66", value: "Easy" },
    { filter: "medium", color: "#ffff80", value: "Medium" },
    { filter: "hard", color: "#ff3333", value: "Hard" }
]

export const filterOptions = (arr, num) => arr
    .filter((_, i, arr) => i !== arr.findIndex(value => value === num))

export const getNumbers = (arr, num) => arr.filter(item => item === num)

export const addToOptions = (arr, num) => [...arr, num]

export const buildMatrix = ({ index, board, currentNum }) => {

    board = board.map((item, i) => i === index ? ({ ...item, value: currentNum, newItem: true }) : item)

    let matrix = [],
        sub = []

    for (let item of board) {

        sub.push(item)

        if (sub.length === 9) {

            matrix.push(sub)
            sub = []
        }
    }

    return { matrix, currentNum, index }
}

const getCords = ({ matrix, currentNum, index }) => {

    for (let i = 0; i < matrix.length; i++) {

        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j].newItem) {
                return { matrix, cords: { row: i, col: j }, currentNum, index }
            }
        }
    }
}

const colToRow = ({ cords, matrix, currentNum, index }) => {

    let cols = []

    for (let i = 0; i < matrix.length; i++) {

        for (let j = 0; j < matrix[i].length; j++) {
            if (j === cords.col) cols.push(matrix[i][j])
        }
    }

    return { cords, matrix, cols, currentNum, index }
}

const squareToRow = ({ matrix, cords, currentNum, cols, index }) => {

    let row = [],
        squares = [],
        copy = JSON.parse(JSON.stringify(matrix))

    while (copy.length) {

        if (row.length) {
            squares.push(row)
            row = []
        }

        copy.forEach((sub, i) => { if (!sub.length) copy.splice(i, 1) })
        // eslint-disable-next-line
        copy.forEach((sub, i) => { if (i < 3) row.push(...sub.splice(0, 3)) })

        copy.forEach((sub, i) => { if (!sub.length) copy.splice(i, 1) })
    }

    if (row.length) squares.push(row)

    return ({ currentNum, matrix, cords, cols, squares, index })
}

const getSquare = ({ currentNum, matrix, cords, cols, squares, index }) => {

    squares = squares.filter((item) => item.map(sub => sub.index).includes(index))

    return ({ matrix, currentNum, cords, cols, squares })
}

const getRow = ({ cords, matrix, cols, currentNum, squares }) => ({
    test: cols.concat(...matrix.filter((_, i) => i === cords.row)).concat(...squares),
    currentNum
})

const filterDuplicates = ({ test, currentNum }) => test.filter(item => item.value === currentNum)

const mapIndex = arr => arr.map(item => item.index).filter((item, i, arr) => arr.indexOf(item) === i)

export const checkDuplicates = payload =>
    compose(
        buildMatrix,
        getCords,
        colToRow,
        squareToRow,
        getSquare,
        getRow,
        filterDuplicates,
        mapIndex
    )(payload)

export const parseData = obj => {

    let mapped = {}

    for (let props in obj.mapped) {

        mapped[props] = JSON.parse(obj.mapped[props])
    }

    obj.mapped = mapped
    obj.matrix = JSON.parse(obj.matrix)

    return obj
}

export const mapValues = (arr, opt = true) => arr.map(({ value }) => value ? opt ? parseInt(value) : value : 0)


export const testValues = arr => arr.every(n => n > 0)

export const filterTruthy = arr => arr.filter(item => !!item)

export const mapString = arr => arr.map(item => String(item))