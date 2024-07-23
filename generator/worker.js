const threads = require('worker_threads')
const isValid = require('./helpers')


if (threads.isMainThread) {

    module.exports = function canContinue(matrix) {

        return new Promise((resolve, reject) => {

            let worker = new threads.Worker(__filename)
            worker.postMessage(matrix)

            worker.on('message', resolve)
            worker.on('error', reject)
        })
    }
    
} else {

    threads.parentPort.once('message', copy => {
        threads.parentPort.postMessage(isValid(copy))
    })
}



