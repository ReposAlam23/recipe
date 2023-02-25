const express = require("express")
const route = express()
const userDB = require("../model/userSchema")
route.use(express.json())
const recipeDB = require("./../model/recipeSchema")
const path = require("path")

route.get("/images/:filename", async(req, res)=>{
    console.log(`./imageFolder/${req.params.filename}`);
    res.sendFile(path.join(_dirname, `./imageFolder/${req.params.filename}`))
})

route.get("/allRecipe", async(req, res)=>{
    try{
        const AllRecipe = await recipeDB.find({})
        console.log(AllRecipe);
        res.json({
            status: "success",
            message: "allRecipe here",
            AllRecipe
        })
    } catch(e){
        res.json({
            status: "failed",
            message: e.message
        })
    }
})

module.exports = route