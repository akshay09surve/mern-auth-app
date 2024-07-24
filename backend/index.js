const express = require('express')
const app = express()
require('dotenv').config()
require('./models/db')
const bodyParser = require('body-parser')
const cors = require('cors')
const AuthRoutes = require('./routes/AuthRoutes')
const ProductRoutes = require('./routes/PoductRoutes')

const PORT = process.env.PORT || 8080

app.use(bodyParser.json())
app.use(cors())

app.use('/auth', AuthRoutes)
app.use('/products', ProductRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})