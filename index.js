const express =require("express");
const { connection } = require("./config/db");
const { UserRouter } = require("./routes/User.router");
const { BookRouter } = require("./routes/Book.router");
const { OrderRouter } = require("./routes/Order.router");



const app =express()
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Home Page")
})

app.use("/",UserRouter)
app.use("/",BookRouter)
app.use('/',OrderRouter)

app.listen(8080,async ()=>{
    try {
        await connection;
        console.log("Connected to DB");
    } catch (error) {
        console.log(" Cannot Connected to DB");  
        console.log(error);
    }
    console.log("Running the server at port 8080");
})