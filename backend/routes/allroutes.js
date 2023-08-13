const router = require("express").Router();
let User = require("../models/users.model");
let Review  = require("../models/reviews.model");
let carDetail = require("../models/cardetails.model");


//checkuser
router.route("/checkuser/:username").get((req, res) => {
  User.find({username: req.params.username})
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});


// login
router.route("/getuser/:username&:password").get((req, res) => {
    User.find({username: req.params.username, password: req.params.password})
      .then((user) => res.json(user))
      .catch((err) => res.status(400).json("Error: " + err));
  });

//adding user
router.route("/adduser").post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const newUser = new User({
    username,
    password
  });

  console.log("checkpoint");

  newUser
    .save()
    .then(() => res.json("User added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});


// get average review for a car
router.route("/getavgreview/:Make&:Model&:Year").get((req, res) => {

  Review.aggregate([ { $match: { Make: req.params.Make, Model: req.params.Model, Year: Number(req.params.Year)}}, 
    { $group: { 
      _id: null, 
      Engine: { $avg: "$engine" }, 
      Chassis: { $avg: "$chassis" }, 
      Aesthetics: { $avg: "$aesthetics" }, 
      Comfort: { $avg: "$comfort" }, 
      "Fuel Efficiency": { $avg: "$fuel efficiency" }, 
      Reliability: { $avg: "$reliability" }, 
      Overall: { $avg: "$overall" } } } ])
    .then((review) => res.json(review))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Get all reviews of a car
router.route("/getallreview/:Make&:Model&:Year").get((req, res) => {

  Review.find({Make: req.params.Make, Model: req.params.Model, Year: Number(req.params.Year)})
    .then((review) => res.json(review))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Get all reviews of a user
router.route("/getuserreview/:username").get((req, res) => {

  Review.find({username: req.params.username})
    .then((review) => res.json(review))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Get top 7 reviewed cars
router.route("/gettopcars").get((req, res) => {

  Review.aggregate([ { $group: { _id: { Make: "$Make", Model: "$Model", Year: "$Year" }, avgOverall: { $avg: "$overall" } } }, { $sort: { avgOverall: -1 } }, { $limit: 7 }, { $project: { _id: 0, Make: "$_id.Make", Model: "$_id.Model", Year: "$_id.Year", overall: "$avgOverall" } } ])
    .then((review) => res.json(review))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Get details of a car

router.route("/getcardetails/:Make&:Model&:Year").get((req, res) => {

  carDetail.find({Make: req.params.Make, Model: req.params.Model, Year: Number(req.params.Year)})
    .then((cardetail) => res.json(cardetail))
    .catch((err) => res.status(400).json("Error: " + err));
});

//search for cars
router.route("/search/:sentence").get((req, res) => {
  var sentence = req.params.sentence;
  var words = sentence.split(' ');
  var words = words.map(word => new RegExp(word, 'i'));


  if (words.length==1 && sentence!="") {
    carDetail.find({ $or: [ { Make: { $in: words } }, { Model: { $in: words } }, { Category: { $in: words } } ] })
    .then((cardetail) => res.json(cardetail))
    .catch((err) => res.status(400).json("Error: " + err));
  }
  else if (words.length==2) {
    carDetail.find({ $or: [ { $and: [ { Make: { $in: words } }, { Model: { $in: words } } ] }, { $and: [ { Make: { $in: words } }, { Category: { $in: words } } ] }, { $and: [ { Model: { $in: words } }, { Category: { $in: words } } ] } ] })
    .then((review) => res.json(review))
    .catch((err) => res.status(400).json("Error: " + err));
  }

  else if (words.length>2) {
    carDetail.find({ $and: [ { Make: { $in: words } }, { Model: { $in: words } }, { Year: { $in: words } } ] })
    .then((review) => res.json(review))
    .catch((err) => res.status(400).json("Error: " + err));
  }
  
  else {
      carDetail.find({})
      .then((review) => res.json(review))
      .catch((err) => res.status(400).json("Error: " + err));
  }
})

//search all cars
router.route("/search/").get((req, res) => {
  carDetail.find({})
      .then((review) => res.json(review))
      .catch((err) => res.status(400).json("Error: " + err));
})

//adding review
router.route("/addreview").post((req, res) => {

  function checkVariablesRange(variables) {
    variables.forEach(variable => {
      if (variable < 1 || variable > 10) {
        throw new Error(`Variable ${variable} is not between 1 and 10`);
      }
    });
  }
  
  const username = req.body.username;
  const Make= req.body.Make;
  const Model= req.body.Model;
  const Year= req.body.Year;
  const engine= req.body.engine;
  const chassis= req.body.chassis;
  const aesthetics= req.body.aesthetics;
  const comfort= req.body.comfort;
  const fuel_efficiency = req.body.fuel_efficiency;
  const reliability = req.body.reliability;
  const overall= req.body.overall;
  const comment= req.body.comment
  
  try {
    checkVariablesRange([engine,chassis,aesthetics,comfort,fuel_efficiency,reliability,overall]);
    console.log('All ratings are within range.');
    const newReview = new Review({
      username,
      Make,
      Model,
      Year,
      engine,
      chassis,
      aesthetics,
      comfort,
      "fuel efficiency": fuel_efficiency,
      reliability,
      overall,
      comment
    });
  
    console.log("checkpoint");
  
    newReview
      .save()
      .then(() => res.json("Review added!"))
      .catch((err) => res.status(400).json("Error: " + err));
    
  } catch (error) {
    res.status(400).json("Error: " + error);
  }
});


module.exports = router;