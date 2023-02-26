const express = require("express")
const route = express()
route.use(express.json())
const recipeDB = require("./../model/recipeSchema")
const path = require("path")

route.get("/images/:filename", async(req, res)=>{
    console.log(req.params.filename);
    res.sendFile(path.join(__dirname, `./../Uploads/${req.params.filename}`))
})

route.get("/allRecipe/:userid", async(req, res)=>{
    try{
        const {userid} = req.params
        const AllRecipe = await recipeDB.find({userid})
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

route.get("/allRecipe/:userid/:search", async(req, res)=>{
    try{
        const search = `^${req.params.search}`
        const {userid} = req.params
        console.log(userid, search);
        const AllRecipe = await recipeDB.find({ 
            userid: req.params.userid,
            $or: [{ title: { $regex: search, $options: "i" } },]
        })
    
        res.json({
            status:"recieved",
            AllRecipe
            })


    }catch(e){
        res.json({
            status: "failed",
            message: e.message
        })
    }
})

module.exports = route