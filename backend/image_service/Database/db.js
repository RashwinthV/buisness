
const mongoose=require('mongoose')

const ConnectDb=async()=>{
    try {
        const MongoUri=process.env.MONGOURI
         if (!MongoUri) {
      throw new Error("MONGODB_URI is not defined in .env file");
    }
   await mongoose.connect(MongoUri)

    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

module.exports=ConnectDb