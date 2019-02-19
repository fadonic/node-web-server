console.log("Starting app!");
const express = require("express");
const hbs =require("hbs");
const fs = require("fs");

const app = express();

hbs.registerPartials(__dirname + "/views/partials");
hbs.registerHelper("getCurrentYear", ()=>{
  
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text)=>{
  return text.toUpperCase();
});

app.set("view engine", "hbs");

app.use((req, res, next)=>{

  var now = new Date().toString();
  console.log(`${now} ${req.method} ${req.url}`);
  var log =  `${now} ${req.method} ${req.url}`;
  fs.appendFileSync("log.txt", log + '\n');
  next();
});

app.use((req, res, next)=>{
  res.render("maintenance.hbs");
});

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res)=>{
  //res.send("<h1>Hello Express!</h1>");
  res.render("home.hbs", {
    pageTitle: "Home Page",
    welcomeMessage: "Welcome to my website"
  });
});

app.get("/about", (req, res)=>{
  
  res.render("about.hbs", {
    pageTitle: "About Page",
  });

});

app.listen(3000, ()=>{
    console.log("Server Started at Port 3000");
});

