const mongoose = require("mongoose")
const uri = "mongodb://localhost:27017/RECIPE"

mongoose.set('strictQuery', false)
const connection = async ()=>{

    await mongoose.connect(uri, (err)=>{
        if(err){
            console.log(err);
        } else{
            console.log("connection to DB successful");
        }
    })
}

module.exports = connection