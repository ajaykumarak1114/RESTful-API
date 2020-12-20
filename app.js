const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({extended : true}));

app.set('engine view', 'ejs');

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser : true, useUnifiedTopology : true});

// created article schema
const articleSchema = {
  title : String,
  content : String
}
// Created Article model
const Article = mongoose.model("Article", articleSchema);








app.listen(3000, function(){
  console.log("Server is running on Port 3000");
})
