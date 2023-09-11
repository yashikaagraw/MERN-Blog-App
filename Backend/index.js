const express = require("express")
const {connection} = require("./config/db")
const{UserModel} = require("./model/User.model")

const app= express()
const port= 8000

app.use(express.json())

app.get("/", (req,res)=> {
    res.send("basic end point")
})

app.post("/signup", async (req,res)=> {
const payload =  req.body
const new_user= new UserModel(payload)
await new_user.save()
res.send({msg : "sign up successfully", new_user})
console.log(payload)
})

app.post("/login", async (req,res)=> {
    const{email, password} = req.body
    const user = await UserModel.findOne({email, password})
    if(!user) {
        res.send({msg: "invalid credentials"})
    }else{
        res.send({msg : "logged in"})
    }
})




app.listen(port, async()=> {
   try {
    await connection
    console.log("connected to db successfully")
   } catch (error) {
    console.log("error while connecting to db")
    console.log(error)
   }
    
})