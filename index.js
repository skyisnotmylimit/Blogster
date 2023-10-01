require("dotenv").config();
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const Blog = require("./models/blog");

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");


const { checkForAuthenticationCookie } = require("./middlewares/authentication");

const app = express();
const port = process.env.PORT;

mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true, useUnifiedTopology: true}).then(()=>{
    console.log("MongoDB connected");
}).catch((err)=>{
    console.log("Error occured with MongoDB",err);
});

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.urlencoded({extended : false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));


app.get("/",async (req,res)=>{
    const allBlogs = await Blog.find({});
    res.render("home",{
        user : req.user,
        blogs : allBlogs
    });
});

app.use("/user",userRoute);
app.use("/blog",blogRoute);

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
});