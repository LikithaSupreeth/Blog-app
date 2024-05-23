require('dotenv').config()
const express = require('express')
const cors = require('cors')
const configureDB = require('./config/db')
const {checkSchema} = require('express-validator')

//multer import
const multer  = require('multer')
let upload = multer({ dest: 'uploads/' })


const {userRegistrationValidation,userUpdateValidation} = require('./validations/userRegisterValidations')
const userLoginValidation = require('./validations/userLoginValidations')

const {tagValidation,tagUpdateValidation} = require('./validations/tagValidations')
const authenticateUser = require('./middlewares/authenticateUsers')
const authorizeUser = require('./middlewares/authorizeUser')

const userCtrl = require('./controllers/userCltr')
const commentCltr = require('./controllers/commentCltr')
const postCltr = require('./controllers/postCltr')
const tagCltr = require('./controllers/tagCltr')

const app = express()
const port = 3444
configureDB()

//multer functionality
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })

upload = multer({ storage })

app.use(express.json())
app.use(cors())

// application level middleware - using it for logging request for debug purpose
app.use(function(req, res, next){
    console.log(`${req.ip} - ${req.method} - ${req.url} - ${new Date()}`)
    next()
})

//user crud operations
app.post('/users/register',checkSchema(userRegistrationValidation),userCtrl.register)
app.post('/users/login',checkSchema(userLoginValidation),userCtrl.login)
app.get('/users/profile',authenticateUser,userCtrl.profile)
app.put('/users/profile',authenticateUser,checkSchema(userUpdateValidation),userCtrl.update)
app.post('/users/upload',authenticateUser,upload.single('file'),userCtrl.upload) // profilePic upload

//post crud operations
app.post('/posts',authenticateUser,postCltr.create)

//tag crud operations
app.post('/tags',authenticateUser,checkSchema(tagValidation),tagCltr.create)



app.listen(port,() =>{
    console.log('server is running on port',port)

})