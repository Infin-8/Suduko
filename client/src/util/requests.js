import axios from 'axios'

const Request = {

    updateBoard: (id, board, selected, history) => axios({
        method: "PUT",
        url: `http://localhost:8000/boards/updateBoard/${id}`,
        data: {
            render: JSON.stringify(board),
            selected: JSON.stringify(selected),
            history: JSON.stringify(history)
        }
    }),

    updateTime: (id, time) => axios({
        method: "PUT",
        url: `http://localhost:8000/boards/updateTime/${id}`,
        data: { time }
    }),

    updatePlaying: id => axios({
        method: "PUT",
        url: `http://localhost:8000/boards/updatePlaying/${id}`
    }),

    updateFinished: id => axios({
        method: "PUT",
        url: `http://localhost:8000/boards/updateFinished/${id}`
    })

}

export default Request