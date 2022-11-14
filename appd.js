const express = require("express");
const app = express();
const path = require("path");
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
mongoose.connect('mongodb://localhost/contactDance');
const port = 8000;

// Defining mongoose Schema

var contactSchema = new mongoose.Schema({
    name: String,
    Email: String,
    Phone: String,
    Address: String,
    Concern: String
  });

  var Contact = mongoose.model('Contact', contactSchema);

app.use('/static', express.static('static'));
app.use(express.urlencoded({extended: true}));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res)=>{
    res.status(200).render('home');
 });

 app.get('/contact', (req, res)=>{
    res.status(200).render('contact');
 });

 app.post('/contact', (req, res)=>{
     var myData = new Contact(req.body);
     myData.save().then(()=>{
         res.send("This form has been Submitted.")
     }).catch(()=>{
         res.status(400).send("This form has not been Submitted.")
     });
    // res.status(200).render('contact');
 });

app.listen(port, ()=> {
    console.log(`The application started at ${port}`) 
});

