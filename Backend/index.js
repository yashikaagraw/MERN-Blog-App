const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cors = require("cors")


const {connection} = require("./config/db")
const{UserModel} = require("./model/User.model")


const app= express()
const port= 8000


app.use(express.json())
//app.use(cors())
app.use(cors({ origin : "*"}))

app.get("/", (req,res)=> {
    res.send("basic end point")
})

app.post("/signup", async (req,res)=> {

const{name, email, password}=req.body
bcrypt.hash(password, 3, async function(err, hash) {
  const new_user= new UserModel({
    name,
    email,
    password : hash,
  })
  
  try {
    await new_user.save()
    res.send({msg: "sign up successfully", new_user})
  } catch (error) {
    res.send("something went wrong")
    console.log(error)
  }

    // Store hash in your password DB.
});



// const payload =  req.body
// const new_user= new UserModel(payload)
// await new_user.save()
// res.send({msg : "sign up successfully", new_user})
// console.log(payload)
})

app.post("/login", async (req,res)=> {
    const{email, password} = req.body
    const user = await UserModel.findOne({email})
    
    if(!user) {
        res.send({msg: "sign up first!"})
    }else{

      const hashed_password= user.password
      

        bcrypt.compare(password, hashed_password, function(err, result) {

            if(result){
                var token = jwt.sign({ user_id: user._id }, 'yash');

                res.send({msg: "logged in", token : token})
            }else{
                res.send("invalid password")
            }
            // result == true
        });
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