const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const multer = require('multer')
const helmet = require('helmet')
const morgan = require('morgan')
const path = require('path')
const {fileUrlToPath} = require('url')
const {register}= require('./controllers/auth.js')
const authRoutes = require('./routes/authRoutes.js')
const userRoutes = require('./routes/userRoutes.js')

/*Configurations*/
// const __filename = fileUrlToPath(import.meta.url)
// const __dirname = path.dirname(__filename);
dotenv.config()
const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}))
app.use(morgan("common"))
app.use(bodyParser.json({ limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}))
app.use(cors())
app.use("/assets", express.static(path.join('public/assets'))) /* This sets tje directory for where we sate the files(images) */

// File Storage Configuration
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"public/assets");
    },
    filename: function(req,file,cb){
        cb(null, file.originalname);
    }
})
const upload = multer({storage});

// Routes with Files

app.post('/auth/register', upload.single("picture"), register);

//  Routes
app.use('/auth', authRoutes)
app.use('/user', userRoutes)


// Mongoose Setup
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() =>{
    app.listen(PORT, ()=> console.log(`Server listening on port: ${PORT}`));
}).catch((err)=> console.log(`${err} did not connect`))

