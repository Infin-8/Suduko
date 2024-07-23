const Controller = require("../controllers/boards.controller")

module.exports = (app) => {
    app.post("/boards/newBoard", Controller.newBoard);
    app.get("/boards/getBoards/:diff", Controller.getBoards);
    app.get("/boards/getBoard/:id", Controller.getBoard);
    app.put("/boards/updateBoard/:id", Controller.updateBoard);
    app.put("/boards/deleteBoard/:id", Controller.deleteBoard);
    app.put("/boards/updateTime/:id", Controller.updateTime);
    app.put("/boards/updatePlaying/:id", Controller.updatePlaying);
    app.put("/boards/updateFinished/:id", Controller.updateFinished)
}