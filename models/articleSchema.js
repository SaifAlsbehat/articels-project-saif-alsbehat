//Schema is the structure of artice (يعني الأشياء يلي بتوخذ بيانات في الموقع يلي انا بصممو )
// بالسكيما انا بعرف شكل البيانات يلي راح ارسلو الى قاعدة البيانات , حيث سيتم تخزين البيانات على شكل أوبحكت وكل أوبجكت له أي دي معين 
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// define the Schema (the structure of the article)
const articleSchema = new Schema({
    title: String,
    summary: String,
    body: String,
  });
// Create a model based on that schema
const Article = mongoose.model("Article", articleSchema);

//export the model 
module.exports = Article; 

  