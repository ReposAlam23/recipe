const mongoose = require("mongoose")
const uri = "mongodb+srv://Alam:AlamRecipe@cluster0.nlzwwya.mongodb.net/?retryWrites=true&w=majority"

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
