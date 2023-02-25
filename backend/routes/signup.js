const express = require("express")
const route = express()
const userDB = require("../model/userSchema")
route.use(express.json())
const bcrypt = require("bcrypt")

route.post("/signup", async(req, res)=>{
    try{
        const {name, email, password} = req.body
   
        const checkUser = await userDB.find({email})
        console.log(checkUser.length);
        if(checkUser.length){
            return res.json({
                status: "failed",
                message: "Email Id already exists"
            })
        } else{
            bcrypt.hash(password, 10, async(err, encryptedPass)=>{
                if(err){
                    return res.json({
                        status: "failed",
                        message: err.message
                    })
                } else{
                    const createUser = await userDB.create({
                        name,
                        email,
                        password: encryptedPass
                    })
                    res.json({
                        status: "success",
                        createUser
                    })
                }
            })
        }
    } catch(e){
        res.json({
            status: "failed",
            message: e.message
        })
    }
})

module.exports = route