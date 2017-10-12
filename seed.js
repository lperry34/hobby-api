
var db = require('./models');
var new_hobbie = {
  name: "Longboarding",
  description: "Long skateboard with big wheels"
}

db.Hobbie.create(new_hobbie, function(err, hobbie){
  if(err){
    return console.log("Error:", err);
  }

})
