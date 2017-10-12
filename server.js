// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

 var hobbies = [
   {
     _id: 1,
     name: "longboarding",
     description: "A longer skateboard with big wheels for gliding down hills!"
   },
   {
     _id: 2,
     name: "gaming",
     description: "pc gaming (no consoles allowed!!) I play tons of different pc games."
   },
   {
     _id: 3,
     name: "coding",
     description: "I guess one of my hobbies now includes coding at GA since I am there 8 hours a day"
   }
 ];

// var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/*
 * JSON API Endpoints
 */

app.get('/api', function apiIndex(req, res) {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  res.json({
    woopsIForgotToDocumentAllMyEndpoints: true, // CHANGE ME ;)
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/example-username/express_self_api/README.md", // CHANGE ME
    baseUrl: "http://YOUR-APP-NAME.herokuapp.com", // CHANGE ME
    endpoints: [
      {method: "GET", path: "/api", description: "You can see all the other endpoints right here."},
      {method: "GET", path: "/api/profile", description: "Some information about my personal and proffesional life."},
      {method: "GET", path: "/api/hobbies", description: "All of my favorite hobbies."},
      {method: "GET", path: "/api/hobbies/id", description: "One of my favorite hobbies."},
      {method: "POST", path: "/api/hobbies", description: "Create some new hobbies if you would like"},
      {method: "PUT", path: "/api/hobbies/id", description: "Update some of my hobbies"},
      {method: "DELETE", path: "/api/hobbies/id", description: "Delete some of my hobbies."}

    ]
  })
});


app.get('/api/profile', function profile(req, res){
  res.json({
    profile:[
        {
        name: "Levi Perry",
        description: "Currently a student at General Assembly."
        },
        {
        github: "This is a link to my github account",
        link: "https://github.com/lperry34"
        },
        {
        name: "personal website",
        link: "https://lperry34.github.io/"
        },
        {
        currentCity: "San Francisco"
        },
      ]
  })
});


app.get('/api/hobbies', function getHobbies(req, res){
  console.log("YOU WANT ALL HOBBIES");
  res.json({'hobbies' : hobbies });
});

app.get('/api/hobbies/id', function getHobbies(req, res){
  console.log("YOU WANT ALL HOBBIES");
  res.json({'hobbies' : hobbies[0] });
});

//make new hobbies
app.post('api/hobbies', function(req, res){
    let createHobbie = req.body;
    hobbies.push(createHobbie);
    res.json(createHobbie);
});

//delete hobbies
app.delete('api/hobbies', function(req, res){
  let thisHobbie = req.params;
  let deleteTodo = hobbies.filter(function(hobbie) {
     return hobbie._id === thisHobbie;
 })[0];

hobbies.splice(hobbies._id)
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
