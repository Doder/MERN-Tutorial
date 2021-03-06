var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectID = require('mongodb').ObjectID;

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

    if(priority !== 'undefined' && status !== 'undefined') searchObject = {priority: priority, status: status}
    else if(priority !== 'undefined') searchObject = {priority: priority}
    else if(status !== 'undefined') searchObject = {status: status}
    
    var result = db.collection("bugs")
    .find(searchObject)
    .toArray(function(err, docs){
        res.json(docs);
    });

});
app.get('/api/bugs/:id', function(req, res, err){
    db.collection('bugs').findOne({_id: ObjectID(req.params.id)}, function(err, bug){
        res.json(bug);
        console.log(bug);
    });

});
app.put('/api/bugs/:id', function(req, res, err){
    let idOfBug = ObjectID(req.params.id);
    const collection = db.collection("bugs");
    collection.findOne({_id: idOfBug}, function(err, doc){
        let id = ObjectID(doc._id); 
        collection.updateOne({_id: id}, req.body, function(err, doc){
            res.json(doc);
        });
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
