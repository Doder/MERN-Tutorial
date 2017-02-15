var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');


var bugData = [
{id: 1, priority: "P1", status: "Open", owner:"Amelia", title:"App crashes on open"},
{id: 2, priority: 'P2', status:'New', owner:'Eddie', title:'Misaligned border on panel'},
];

var url = 'mongodb://localhost:27017/bugsdb';
var db;

app.use(express.static('static'));
app.use(bodyParser.json());
app.get('/api/bugs', function(req, res){
    var priority = req.query.priority;
    var status = req.query.status;
    var searchObject = {};

    if(priority && status) searchObject = {priority: priority, status: status}
    else if(priority) searchObject = {priority: priority}
    else if(status) searchObject = {status: status}
    
    var result = db.collection("bugs")
    .find(searchObject)
    .toArray(function(err, docs){
        res.json(docs);
    });

});
app.post('/api/bugs', function(req, res){
    var newBug = req.body;
    var id;
    db.collection("bugs").insertOne(newBug, function(err, docs){
        id = docs.insertedId;
        db.collection("bugs").find({_id:id}).next(function(err, docs){
        res.json(docs);
    });
    });
    
});
MongoClient.connect(url, function(err, database) {
  assert.equal(null, err);
  db = database;
  console.log("Connected correctly to server.");
  app.listen(3000);
});
