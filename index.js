const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config();

const userRoutes = require('./routes/userRoutes')
const pdtRoutes = require('./routes/pdtRoutes')

mongoose.connect('mongodb://127.0.0.1:27017/Authentification').then(
    () => {
        console.log('connected to DB')
    }
).catch((err) => {
    console.log('err coonecting ' + err)
})
app.use(cors());
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('uploads/'))
app.use('/user', userRoutes)
app.use('/pdt', pdtRoutes)

app.listen(port, () => {
    console.log(`server is runing on localhost:${port}`)
})