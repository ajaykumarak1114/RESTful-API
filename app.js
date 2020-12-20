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

//******************************* REQUEST TARGETTING ALL THE ARTICLES ****************************//

app.route("/articles")
.get(function(req, res){
  Article.find(function(err, foundArticles){
    if(!err){
      res.send(foundArticles);
    } else{
      res.send(err);
    }
  });
})
.post(function(req, res){
  const newArticle = new Article({
    title : req.body.title,
    content : req.body.content
  })
  newArticle.save(function(err){
    if(!err){
      res.send("Successfully added new article");
    } else{
      res.send(err);
    }
  });
})
.delete(function(req, res){
  Article.deleteMany(function(err){
    if(!err){
      res.send("Successfully deleted all the articles");
    } else {
      res.send(err);
    }
  });
});

//************************************** REQUEST TARGETTING A SPECIFIC ARTICLE *******************//

app.route("/articles/:articleTitle")

.get(function(req, res){
  Article.findOne({title : req.params.articleTitle}, function(err, foundArticle){
    if(foundArticle){
      res.send(foundArticle);
    } else {
      res.send("Not found any article with the given title");
    }
  })
});

app.listen(3000, function(){
  console.log("Server is running on Port 3000");
})
