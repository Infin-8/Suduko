let timestore = (function timer() {

    let _timestamp = {}

    const getTimeStamp = () => _timestamp

    const initializeTimeStamp = (id) => {

        _timestamp.id = id
        _timestamp.time = 0

    }

    const updateTime = () => {

        _timestamp.time += 1000

    }

    const clearTime = () => {

        _timestamp = {}
        
    }

    return { updateTime, getTimeStamp, clearTime, initializeTimeStamp }

}())

export default timestore