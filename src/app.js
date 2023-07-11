const express = require("express");
const cors = require("cors");
const user = require("./routers/user.routers")
const errorHandling = require("./error/errorHandling");
const app = express();

app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(user);

app.use(function(req, res, next){
    res.status(404).json({error:true,
                        codigo:404,
                        message: "Endpoint doesnt found"})
})

app.use(errorHandling);

module.exports = app;