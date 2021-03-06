const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/Sangraha', {useNewUrlParser: true});
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});
const bodyparser = require("body-parser");
const app = express();
const port = 80;


// Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String
  });

  const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); //for serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug'); // set the templet engine as pug
app.set('views', path.join(__dirname, 'views')); // set the views directory


// ENDPOINTS
app.get('/', (req, res)=>{
    
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    
    var myData = new Contact(req.body);
    myData.save().then(()=> {
        res.send("This item has been saved to the database")
    }).catch(()=> {
        res.status(400).send("Item was not saved to the database")
    });

    // res.status(200).render('contact.pug');
})



// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});

