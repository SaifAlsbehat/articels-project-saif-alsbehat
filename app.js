// this file to control on web site 
const express = require('express') // line 1 and line 2 to framework express
const app = express()
const port = 8080  // this is port number 
app.set('view engine', 'ejs')
app.use(express.static('public')) // this is to use html and css in my app (css and html is static)
app.use(express.urlencoded({ extended: true })); // this code to save data to send to mongo 
const Article = require('./models/articleSchema');
/**
 * get method is used to get from specific web page information by using res,req
 * res is used to response from srever and information is show in body of web page 
 * you can response error,html tag, messege, ....
 *  
 */
// this code is special to auto connect to the server and refresh automatically

const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));


const connectLivereload = require("connect-livereload");
app.use(connectLivereload());

liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});
//end auto refresh code 

//connect to mongo database
const mongoose = require('mongoose');
const { isAsyncFunction } = require('util/types')
const { ADDRGETNETWORKPARAMS } = require('dns')
mongoose.connect("mongodb+srv://saif:S4S@cluster0.f0axvhm.mongodb.net/all-data?retryWrites=true&w=majority")
.then((result) =>
{
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
})
.catch((err) =>
{
  console.log(err);
})

// end connect to mongo database 

// start code to post request and save data in mongo database 

//const Article = require("./models/articleSchema");

app.post("/all-articles", (req, res) => {
const article = new Article(req.body);
 
 // console.log(req.body)});
  article
  .save()
  .then((result) =>
  {
    res.redirect('/all-articles');
  })
  .catch((err) => {console.log(err);})

});

// end code to save data in database mongo 

//now i need to write a code to get data from database and show it in my website
// start code 

app.get('/all-articles', (req,res)=>
{
  Article.find()
  .then(  (result) =>
  {
    res.render("index",{myTitle: "HOME", arrArticle: result});
  } )
  .catch(
    (err) =>
    {
       console.log(err);
    }
  );
   // note : you can write the above code in get that specific for render 
});

// end code to get data from database and show it in my website

app.get('/', (req, res) => {

  res.redirect("/all-articles");
})

app.get("/all-articles", (req, res) => {
  res.render("index",{myTitle: "HOME"})
})

app.get("/add-new-article", (req, res) => {
  res.render("add-new-article", {myTitle: "create new articel"})
});

// get data to /article-details when click on show more 
/* app.get('/all-articles/article-details', (req,res) =>
{
    
    Article.findById('6474c02db6e4073b9e0699c0')
    .then((result) =>
    {
      res.render("details", {myTitle : "Details", objArticle: result})   
    })
    .catch((err) =>
    {
      console.log(err);
    })
}); */

// end show more page

// this code to show data in /article-details page automatically 
// start code
app.get('/all-articles/:id', (req,res) =>
{
    Article.findById(req.params.id)
    .then((result) =>
    {
       res.render('details', {myTitle: "Details", objArticle: result})
    })
    .catch((err) =>
    {
      console.log(err);
    }) 
});

// end code 

// this code to delete article from database when click on button in details page
// start code
app.delete("/all-articles/:id", (req,res) =>
{
   Article.findByIdAndDelete(req.params.id)
   .then((result) => 
   {
      // هاي المعلومة راح تروح لالى الداتا الموجودة في ملف التفاصيل ومن ثم اخذها من هناك 
      res.json( {mylink : "/all-articles"} )
   })
   .catch((err) => console.log(err))
});
// end code

//const fs = require('fs');
/* app.get('/html', (req, res) => {
  //this method from resourse to send file to show on website , you should specific a root
  //res.sendFile('./views/index.html', {root: __dirname});
  res.render('index')
}) */



// this mothod is used to handle 404 error , we can give this code from express web site in fqq page  
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
  //res.end();
})
//request vs response 
// requset is request from user from specific website , in this step the request of user is go 
// to the server and request from the server css file and javascript code for show the ui 
// respone when the serever is send to the user the file that you request 
// listen to the code of express rhat is write in a bove 


