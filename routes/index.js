var express = require('express');
var router = express.Router();


var loki = require('lokijs');

var db = new loki('data.json', {
    autoload: true,
    autoloadCallback: databaseInitialize,
    autosave: true,
    autosaveInterval: 4000
});


// implement the autoloadback referenced in loki constructor
function databaseInitialize() {
    var bookings = db.getCollection("bookings");
    if (bookings === null) {
        bookings = db.addCollection("bookings");
    }
}

/* GET home page. */
router.get('/get', function (req, res) {
    let result = db.getCollection("bookings").find();
    res.json(result);
  });
  
  module.exports = router;

module.exports = router;
/* Handle the Form */
router.post('/form', function (req, res) {

    var response = {
        header: req.headers,
        body: req.body
    };
    db.getCollection("bookings").insert(req.body);
    res.json(response);    
});


/* Handle the Form submission with Restful Api */
router.post('/bookings', function (req, res) {
  
    let result = db.getCollection("bookings").insert(req.body);
  
    res.status(201).json({ id: result.$loki });
  });

  router.get('/bookings', function (req, res) {

    var result = db.getCollection("bookings").find();
    res.json(result);
  });

