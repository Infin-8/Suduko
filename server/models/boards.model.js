const mongoose = require('mongoose')
const { Schema } = mongoose;


const Board = new Schema({
    matrix: String,
    mapped: {
        selected: String,
        render: String,
        history: String
    },
    difficulty: String,
    timestamp: Number,
    completed: Boolean,
    playing: Boolean,
    playingSince: Number

}, { timestamps: true })


const Boards = mongoose.model('boards', Board)

module.exports = Boards

