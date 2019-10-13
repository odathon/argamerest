const Router = require('express');

const router = new Router();

router.post('/customer', async (req, res, next) => {
  try{
    var time=new Date.getTime();
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
      rating: 0
      metric:0
       };
     const customer = await db.collection('customers').findOne();
    if (customers) {
      console.log(customers);
      res.send(customers);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
});


var randomFixedInteger = function (length) {
    return Math.floor(Math.pow(10, length-1) + Math.random() * (Math.pow(10, length) - Math.pow(10, length-1) - 1));
}

module.exports = router;