const mongoose=require('mongoose')
const connection=mongoose.connect(`mongodb+srv://kamal:kamal@cluster0.ynloa2j.mongodb.net/masailiabrarysystem?retryWrites=true&w=majority`)

module.exports={connection}