//import 
const express = require("express");
const usersRoute = require("./routes/v1/user.route");
const dbConnect = require("./utils/dbConnect");

//middleware
const cors = require("cors")
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//databse connected
dbConnect();

app.use("https://afternoon-tor-01109.herokuapp.com/user",usersRoute);




//basic test
app.get("/",(req,res)=>{
    console.log("Server is Running...");
    res.send("Server is Running...");
});

// test server port
app.listen(port,()=>{
    console.log(`Server is Running at port ${port}`)
});

//send response for unknown route
app.all("*",(req,res)=>{
    res.send("No Route Found");
})