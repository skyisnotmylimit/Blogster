require("dotenv").config();
const path = require("path");
const express = require("express");
const userRoute = require("./routes/user");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");

const app = express();
const port = process.env.PORT;
app.use(express.urlencoded({extended : false}));
app.use(cookieParser);
app.use(checkForAuthenticationCookie("token"));
app.use("/user",userRoute);
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true, useUnifiedTopology: true}).then(()=>{
    console.log("MongoDB connected");
}).catch((err)=>{
    console.log("Error occured with MongoDB",err);
});

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
app.get("/",(req,res)=>{
    res.render("home");
});
app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});