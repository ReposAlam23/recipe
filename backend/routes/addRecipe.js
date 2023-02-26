const express = require("express")
const route = express()
route.use(express.json())
const recipeDB = require("../model/recipeSchema")

route.post("/addRecipe/", async(req, res)=>{
    try{
        const { title, author, ingredients, direction, userid} = req.body
        const {image} = req.files
        console.log(req.body);
        image.mv( "./Uploads/" + image.name, async(err)=>{
            if(err){
                res.json(err)
            }else{
                const postRecieve = await recipeDB.create({
                    ...{title, author, ingredients, direction, userid},   
                    image: image.name
                })
                try{const response = postRecieve
                    res.json(response)
                } catch(e){
                    res.json({message: e.message})    
                }
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