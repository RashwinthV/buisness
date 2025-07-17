const userModel = require("../Models/userModel");


exports.getUser=async(req,res)=>{
    try {
        const {id}=req.params;
        if(!id){
            return res.json({message:"user not Found!"})
        }
        const user= await userModel.findById(id);
        if(!user){
            return res.json({message:"User Not Found"})
        }
        res.json(user)
    } catch (error) {
        res.json({message:"Internal Server error"})
    }
}

exports.UpdateUser=async(req,res)=>{
    
}