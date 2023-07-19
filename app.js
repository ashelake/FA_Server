const express = require('express')
const router = require('./Router/asset')
const connection = require('./config/db')
require("dotenv").config()
const cors = require('cors')
const port = process.env.PORT || 4002
const app = express()
app.use(cors())
app.use(express.json())

app.use('/', router)

app.listen(port, async function () {
    try {
        await connection
        console.log('listening on port', port)
    } catch (error) {
        console.log(error)
    }
})
