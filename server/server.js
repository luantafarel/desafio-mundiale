
const bodyParser = require("body-parser"),
    crawler = require('../crawler'),
    express = require('express'),
    app = express(),
    port = process.env.NODE_ENV === 'test' ? 3002 : 3000,
    { Worker } = require('worker_threads'),
    validator = require('../middlewares/validator'),
    { validationResult } = require("express-validator");

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

app.post('/', validator(), async (req, res) => {

    // checa erros
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send(errors.errors[0]);
    }

    // Apesar de não ser a melhor solução em questão de performance, o sistema se comportou de forma satisfatória com os resultados obtidos 
    // let response, searchQuery, value = 51, spawnWorker;
    if (String(req.body.search.trim()) !== "" && Number(req.body.int) % 1 === 0) {
        let response = await crawler(`${encodeURI(req.body.search)}`)
        for (let i = 51; i < req.body.int; i = i + 50) {
            const worker = new Worker('./worker/childs.js')
            worker.once('message', async (message) => {
                response = response.concat(message)
                if (response.length >= req.body.int) {
                    if (response && response !== []) return res.status(200).json(response.slice(0, req.body.int))
                    else return res.status(404).send('no results find with this search')
                }
            })
            worker.on('error', console.error)
            worker.postMessage(`${encodeURI(req.body.search)}` + `_Desde_${i}`)
        }
    } else return res.status(422).send('either search is invalid or empty or has decimal parts')

})
app.listen(port, () => { })
module.exports = app