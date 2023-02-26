const mongoose = require("mongoose")

const recipeSchema = new mongoose.Schema({
    title: {type: String},
    author: {type: String},
    image: {type: String},
    ingredients: {type: String},
    direction: {type: String},
    userid: {type: String}
})

const recipe = mongoose.model("recipes", recipeSchema)
module.exports = recipe