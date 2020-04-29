
const bodyParser = require("body-parser"),
    crawler = require('../crawler'),
    express = require('express'),
    app = express(),
    port = 3000,
    { Worker } = require('worker_threads');

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

app.post('/', async (req, res) => {
    // Apesar de não ser a melhor solução em questão de performance, o sistema se comportou de forma satisfatória com os resultados obtidos 
    // let response, searchQuery, value = 51, spawnWorker;
    let response = await crawler(`${encodeURI(req.body.search)}`)
    for (let i = 51; i < req.body.int; i = i + 50) {
        const worker = new Worker('./worker/childs.js')
        worker.once('message', async (message) => {
            response = response.concat(message)
            if (response.length >= req.body.int) {
                if (response && response !== []) return res.status(200).json(response.slice(0, req.body.int))
                else return res.status(404).json('no results find with this search')
            }
        })
        worker.on('error', console.error)
        worker.postMessage(`${encodeURI(req.body.search)}` + `_Desde_${i}`)
    }
})

module.exports = function start() {
    app.listen(port, () => { })
}