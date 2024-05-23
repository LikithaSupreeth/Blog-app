require('dotenv').config()
const express = require('express')
const cors = require('cors')
const configureDB = require('./config/db')
const {checkSchema} = require('express-validator')
const userRegistrationValidation = require('./validations/userRegisterValidations')

const userCtrl = require('./controllers/userCltr')

const app = express()
const port = 3444
configureDB()

app.use(express.json())
app.use(cors())

// application level middleware - using it for logging request for debug purpose
app.use(function(req, res, next){
    console.log(`${req.ip} - ${req.method} - ${req.url} - ${new Date()}`)
    next()
})

app.post('/users/register',checkSchema(userRegistrationValidation),userCtrl.register)

app.listen(port,() =>{
    console.log('server is running on port',port)

})