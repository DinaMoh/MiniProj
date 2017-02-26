let User = require('../models/User');

let userController = {


  //Get All Users
  getAllUsers:function(req, res){

      User.find(function(err, users){

          if(err)
              res.send(err.message);
          else
              res.json(users);
      })
  },

  // Register User
  createUser:function(req, res){
    let user = new User(req.body);

    user.save(function(err, user){
      if(err){
        res.send(err.message)
        console.log(err);
      }
      else {
        console.log(user);
      }
    });
  },


  //Get User by email and password
  loginUser:function(req, res, next){
    User.findOne(req.body.email, req.body.password, function(err, users){
      if(err){
        res.send(err.message);
        console.log("Wrong email or password");
      }
      else {
        res.json(users);
        console.log("yaay");
      }
    });
  }

}
module.exports = userController;
