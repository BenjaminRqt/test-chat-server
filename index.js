const apiRoutes = require('./src/routes/api');

const mongoose = require('mongoose')
const express = require('express')
const http = require('http')
const cors = require('cors')
const WebSocket = require('ws')
const app = express()
const port = 3030
const bodyParser = require('body-parser')
const config = require('./config/index')

const seederService = require('./src/services/seeder.service');

mongoose.connect(config.dbConnection, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
})

app.use(bodyParser.json())

const corsConfig = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000/')
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
}

app.use(corsConfig);
app.use(cors());

app.use('/api', apiRoutes);

if (config.seedData) {
    seederService.seedData()
}

const server = http.createServer(app);
const wss = new WebSocket.Server({ server })


wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(data) {
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data);
            }
        })
    })
})

server.listen(port, () => console.log(`Example app listening on port ${port}!`))
