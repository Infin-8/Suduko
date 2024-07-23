const Boards = require("../models/boards.model")


module.exports = {

    newBoard: (req, res) => {
        Boards.create(req.body)
            .then(created => res.json(created))
            .catch(err => console.log('created error', err))
    },
    deleteBoard: (req, res) => {
        Boards.findByIdAndRemove(req.params.id)
            .then(deleted => res.json(deleted))
            .catch(err => console.log('deleted error', err))
    },
    getBoards: (req, res) => {
        Boards.find({ difficulty: req.params.diff })
            .then(found => res.json(found))
            .catch(err => console.log('found error', err))
    },
    updateBoard: (req, res) => {
        Boards.findByIdAndUpdate(req.params.id, { $set: { "mapped.selected": req.body.selected, "mapped.render": req.body.render, "mapped.history": req.body.history } }, { new: true, useFindAndModify: false })
            .then(updated => res.json(updated))
            .catch(err => console.log('updated error', err))
    },
    getBoard: (req, res) => {
        Boards.findById(req.params.id)
            .then(found => res.json(found))
            .catch(console.log)
    },
    updateTime: (req, res) => {
        Boards.findByIdAndUpdate(req.params.id, { $inc: { "playingSince": req.body.time } }, { new: true, useFindAndModify: false })
            .then(updated => res.json(updated))
            .catch(console.log)
    },
    updatePlaying: (req, res) => {
        Boards.findByIdAndUpdate(req.params.id, { "playing": true }, { new: true, useFindAndModify: false })
            .catch(console.log)
    },
    updateFinished: (req, res) => {
        Boards.findByIdAndUpdate(req.params.id, { "completed": true, "playing": false }, { useFindAndModify: false })
            .catch(console.log)
    }

}