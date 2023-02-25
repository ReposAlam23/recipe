const express = require("express")
const route = express()
const userDB = require("../model/userSchema")
route.use(express.json())
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

route.post("/signin", async(req, res)=>{
    try{
        const { email, password} = req.body
        const checkUser = await userDB.findOne({email})
        console.log(checkUser);
        if(!checkUser){
            res.json({
                status: "failed",
                message: "user not registered. Kindly register"
            })
        } else{
            const valid = await bcrypt.compare(password, checkUser.password) 
            console.log(valid);
            if(!valid){
                    return res.json({
                        status: "failed",
                        message: "Invalid Credentials"})
            } else{
                const token = jwt.sign(
                    { exp: Math.floor(Date.now()/1000)*(60*60*60),
                        id: checkUser.id
                    }, "SecretKey", )

                const userdetails = {...checkUser._doc, password: undefined}
                
                res.json({
                    status: "success",
                    message: {userdetails, token}
                })
            }
        }
    } catch(e){
        res.json({
            message: e.message
        })
    }
})

module.exports = route