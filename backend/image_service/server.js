const express=require('express')
const app=express()
require('dotenv').config()
const cors=require('cors')
const connectDb=require('./Database/db')
const businessses=require('./Routes/BussinessRoute')
const User=require('./Routes/userRoute')


app.use(cors())
app.use(express.json())
connectDb()

app.use('/bussinessimage',businessses)
app.use('/userimage',User)



 
const port=process.env.PORT||4012

app.listen(port,()=>{
    console.log(`Image Server is running on port ${port}`);
    
})