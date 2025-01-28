const express = require ("express");
const cors = require("cors");
const cookieParser = require("cookie-parser")
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes/index')
 const path = require ("path");
const {fileURLToPath} = require('url')

const app = express()
app.use(cors({
      origin : `https://mern-3k0k.onrender.com`,
    // origin : ['https://mern-ecommerce-nu-inky.vercel.app',process.env.FRONTEND_URL, 'https://sumant-ekart.netlify.app'],
    credentials:true,
    httpsOnly:true,
    secure:true
    
   
}))
//


app.use(express.json())
app.use(cookieParser())

// const __Filename = fileURLToPath()
const __diirname = path.resolve()
console.log(__diirname)


const PORT = process.env.PORT || 8080

// app.get("/",(req,res)=>{
//     res.send("hello API")
// })

app.use("/api",router)



//Use the client app
app.use(express.static(path.join(__diirname ,'/client/dist')))

// Render client for any path
app.get('*',(req,res)=>res.sendFile((path.join(__diirname ,'/client/dist/index.html'))))

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Conect TO Db")
        console.log(PORT)
    })
})
