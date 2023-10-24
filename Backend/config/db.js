//we use db.js to connect with mongoDB/database with the help of mongoose

const mongoose = require("mongoose")

const connection = mongoose.connect("mongodb+srv://yashikaagraw:8126472202@cluster0.aewjx9l.mongodb.net/mernblog?retryWrites=true&w=majority")

module.exports= {connection}


