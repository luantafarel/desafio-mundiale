const crawler = require('../crawler'),
    { parentPort } = require('worker_threads');

parentPort.once('message', async (message) => {
    parentPort.postMessage(await crawler(message))
})