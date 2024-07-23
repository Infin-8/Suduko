const setDifficulty = (board, difficulty) => {

    let selected = [],
        render = board.flat().map(value => ({ value, mutable: false, color: "black", deletable: false })),
        percentage = difficulty === "easy"
            ? 0.6
            : difficulty === "medium"
                ? 0.5
                : 0.4

    // difficulty: difficulty >= 0.6 ? "easy" : difficulty >= 0.5 ? "medium" : "hard",

    for (let i = 0; i < render.length; i++) {

        if (Math.random() >= percentage) {
            selected.push(render[i].value)
            render[i] = { value: "", mutable: true, color: "#00b300", deletable: true }
        }

    }

    return { selected: JSON.stringify(selected), render: JSON.stringify(render), history: JSON.stringify([]) }
}

module.exports = setDifficulty