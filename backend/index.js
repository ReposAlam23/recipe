const express = require("express")
const app = express()
const PORT = process.env.PORT || 4001
const conn = require("./connection/connection")
conn()
const signupRoute = require("./routes/signup")
const signinRoute = require("./routes/signin")
const addRecipeRoute = require("./routes/addRecipe")
const allRecipe = require("./routes/getAllRecipe")
const cors = require("cors")
// const usr = require("./model/userSchema")



app.use(cors())
app.use("/", signupRoute)
app.use("/", signinRoute)
app.use("/", addRecipeRoute)
app.use("/", allRecipe)

app.get("/",(req, res)=>{
    res.send("working")
})
  

app.listen(PORT, ()=>{console.log(`Server is running at port ${PORT}`);})