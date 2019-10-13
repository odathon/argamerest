const Router = require('express');

const router = new Router();

router.get('/', async (req, res, next) => {
  console.log(req);
    const db = req.app.locals.db;
    console.log(db);
    //const id = new ObjectID(req.params.id);
    dbo.find({}).then(eachone =>{
    res.json(eachone);
});
  });

router.post('/customer', async (req, res, next) => { 
    const db = req.app.locals.db;
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
      metric:0
       };
     dbo.collection("customers").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    res.json(myobj);
});
   });


var randomFixedInteger = function (length) {
    return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
};

module.exports = router;