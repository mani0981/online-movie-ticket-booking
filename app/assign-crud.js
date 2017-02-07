var express = require('express');
var router = express.Router();
bodyParser = require('body-parser'); //parses information from POST

var mongoose = require('mongoose');

var assignSchema = mongoose.Schema({
    cityName: String,
    theatreName: String,
    showTime: String,
    movieTitle: String
 });
var Assign = mongoose.model('Assign', assignSchema, 'assigning');


router.get('/getAssign', function (req, res) {
    console.log("REACHED GET FUNCTION ON SERVER");
    Assign.find({}, function (err, docs) {
         res.json(docs);

    });
});

router.get('/getAssign/:id', function (req, res) {
    console.log("REACHED GET ID FUNCTION ON SERVER");
     Assign.find({_id: req.params.id}, function (err, docs) {
         res.json(docs);

    });
});

router.post('/addAssign', function(req, res){

 var assigning = new Assign({
     cityName: req.body.CName,
     theatreName: req.body.TName,
     showTime: req.body.STime,
     movieTitle: req.body.MTitle
  });
console.log(assigning);
  assigning.save(function(err, docs){
    if ( err ) throw err;
    console.log("Show Assigned Successfully");
    res.json(docs);
});


 });

router.delete('/deleteAssign/:id/', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Assign.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})

router.put('/updateAssign/:id', function(req, res){
    console.log("REACHED PUT");
    console.log(req.body);
    Assign.findOneAndUpdate({_id:req.params.id}, req.body, function (err, data) {
      console.log(data);
      res.json(data);
    });
})

router.delete('/deleteAssign/:id', function(req, res){
   console.log("REACHED Delete FUNCTION ON SERVER");
      Assign.remove({_id:req.params.id}, function(err, docs){
        res.json(docs);
    });
})




// catch 404 and forward to error handler
router.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = router;
