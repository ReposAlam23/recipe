const express = require("express")
const route = express()
const userDB = require("../model/userSchema")
route.use(express.json())
const recipeDB = require("./../model/recipeSchema")
const path = require("path")

route.post("/addRecipe", async(req, res)=>{
    try{
        const { title, author, ingredients, direction} = req.body
        const {image} = req.files
        console.log(req.body);
        image.mv("./imageFolder" + image.name, (err)=>{
            if(err){
                res.json(err)
            }else{
                const postRecieve = new this.post({
                    ...{title, author, ingredients, direction},
                    image: image.name
                })
            }
            try{
                const response = postRecieve.save()
                res.json(response)
            }catch(e){
                res.json({message: e.message})
            }
        })

    } catch(e){
        res.json({
            status: "failed",
            message: e.message
        })
    }
})

module.exports = route