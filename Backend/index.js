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

// app.post("/signup", async (req,res)=> {

// const{name, email, password}=req.body
// //check for email login multiple times 
// const user = await UserModel.findOne({ email });

// if(user) {
//     res.status(419).json({ msg: "already have a gmail account" });
// }

// bcrypt.hash(password, 3, async function(err, hash) {
//   const new_user= new UserModel({
//     name,
//     email,
//     password : hash,
//   })
  
//   try {
//     await new_user.save()
//     res.send({msg: "sign up successfully", new_user})
//   } catch (error) {
//     res.send("something went wrong")
//     console.log(error)
//   }

//     // Store hash in your password DB.
// });

// })

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if a user with the provided email already exists.
    const user = await UserModel.findOne({ email });

    if (user) {
      return res.status(409).json({ msg: "Email already registered" });
    }

    // Hash the user's password.
    bcrypt.hash(password, 10, async function (err, hash) {
      if (err) {
        console.error(err);
        return res.status(500).json({ msg: "Internal server error" });
      }

      // Create a new user with the hashed password.
      const newUser = new UserModel({
        name,
        email,
        password: hash,
      });

      // Save the new user to the database.
      await newUser.save();

      res.status(201).json({ msg: "Sign up successful", user: newUser });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Something went wrong" });
  }
});





// Define a route for user login
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ msg: 'User not found. Please sign up first.' });
        }

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            // Generate a JWT token
            const token = jwt.sign({ user_id: user._id }, 'your_secret_key_here');
            return res.status(200).json({ msg: 'Logged in', token: token });
        } else {
            return res.status(401).json({ msg: 'Invalid password' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
});







app.listen(port, async()=> {
   try {
    await connection
    console.log("connected to db successfully")
   } catch (error) {
    console.log("error while connecting to db")
    console.log(error)
   }
    
})