const express=require('express')
const app=express()
require('dotenv').config()
const cors=require('cors')
const connectDb=require('./Database/db')
const bussinessRoute=require('./Routes/bussinessRoute')


app.use(cors())
app.use(express.json())
connectDb()

app.use('/bussiness',bussinessRoute)



const port=process.env.PORT||4011

app.listen(port,()=>{
    console.log(`bussiness Server is running on port ${port}`);
    
})