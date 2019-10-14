const express = require('express');
const promise = require('bluebird');
const logger = require('winston');
const MongoClient = require('mongodb').MongoClient;
const json = require('circular-json');
const bodyParser= require('body-parser');
//const ObjectID = require('mongodb');
//const customersRestApi = require('./api/customers');

const app = express();
const uri = "mongodb+srv://salesadmin:Utopia@1990@cluster0-xvnum.mongodb.net/ardb?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
let dbo=null;

let randomFixedInteger = function (length) {
    return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
var port = process.env.PORT || 5000;

// Create a MongoDB connection pool and start the application
// after the database connection is ready
client.connect(function(err,client){
	if(err){

    console.log("Failed to connect to the database" +err);
}
  
  dbo=client.db("ardb");
  //console.log(app.locals.db);

  app.listen(port, () => {
    console.log("Node.js app is listening at http://localhost:"+port);
  });
});



app.get('/customers', (req, res, err) => {
   //console.log(req);
    //const db = dbo;
    //console.log(dbo);
    //let result=null;
    //var result = [];
    //const id = new ObjectID(req.params.id);
  
    dbo.collection("customers").find().toArray(function(err, items) {
          if (err) {
            reject(err);
          } else {
            console.log(items);
            res.json(
            	{ status: 200,
            	  body:{
            	  	items:items
            	  } }
            	);
          }          
        });
     

    
    //res.send(json.stringify(result));
});




app.post('/customers/customer',  (req, res, err) => { 
    //const db = req.app.locals.db;
    console.log("inside post"+json.stringify(req));


    var myobj = { 
      custid: randomFixedInteger(5),
      name: req.body.name,
      companyname: req.body.companyname,
      isbooth1: false,
      isbooth2: false,
      isbooth3: false,
      isbooth4: false,
      isbooth5: false,
      timebooth: null,
      timebooth2: null,
      timebooth3: null,
      timebooth4: null,
      timebooth5: null,
      rating: 0,
      metric: 0
  };
  console.log(myobj);

     dbo.collection("customers").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    
});
     res.json(
            	{ status: 200,
            	  body: myobj
            	}
            	);
   });


app.put('/customers/customer/:id',  (req, res, err) => { 
    //const db = req.app.locals.db;
    console.log("inside put"+json.stringify(req));
    const cust_id = req.params.id;
    console.log(cust_id);
    var myquery = {custid: cust_id};
    var myobj = { $set: req.body};
  console.log(myobj);

     dbo.collection("customers").updateOne(myquery,myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    
});
     res.json(
            	{ status: 200,
            	  body: myobj
            	}
            	);
   });

app.get('/customers/customer/:id',  (req, res, err) => { 
    //const db = req.app.locals.db;
    //console.log("inside getone"+json.stringify(req));
    let result=null;
    const cust_id = req.params.id;
    console.log(cust_id);
    var myquery = {custid: Number(cust_id)};
    //var myobj = { $set: req.body};
  console.log(myquery);

    dbo.collection("customers").find(myquery).toArray(function(err, items) {
          if (err) {
            reject(err);
          } else {
            console.log(items);
             res.json(
            	{ status: 200,
            	  body:{
            	  	items:items
            	  } }
            	);
          }          
        });

   // res.send(result);
});
   




