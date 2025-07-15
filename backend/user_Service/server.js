const express=require('express')
const app=express()
require('dotenv').config()
const cors=require('cors')
const connectDb=require('./Database/db')
const userRoute=require('./Routes/userRoute')


app.use(cors())
app.use(express.json())
connectDb()

app.use('/users',userRoute)



const port=process.env.PORT||4010

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
    
})