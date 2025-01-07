const express = require ("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
require('dotenv').config()
const connectDB = require('./config/db')
const router = require('./routes/index')
// const path = require ("path");
///

const app = express()
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials:true,
    sameSite:"none",
    secure:true
}))
//


app.use(express.json())
app.use(cookieParser())

//  const __dirname = path.resolve();
const PORT = process.env.PORT || 8080


app.use("/api",router)


// if(process.env.NODE_ENV === "production"){
//     app.use(express.static(path.join(__dirname, "/frontend/dist")));
    
//     app.get("*",(req,res)=>{
//         res.sendFile(path.resolve(__dirname, "frontend","dist","index.html"))
//     });
// }


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("Conect TO Db")
        console.log("server is Runinng")
    })
})
