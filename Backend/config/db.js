//we use db.js to connect with mongoDB/database with the help of mongoose

const mongoose = require("mongoose")

const connection = mongoose.connect("mongodb://localhost:27017/mernblog")

module.exports= {connection}
