let User = require('../models/User');
// let Project = require('../models/Project');

let userController = {


  home:function(req, res){
      req.session.destroy();
      res.render('index');
      console.log(req.session.uid);
  },

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
  loginUser:function(req, res){
    // console.log("email : " + req.body.email + " ---- password : " + req.body.password);

      req.body.email = req.params.email;
      req.body.password = req.params.password;
      // console.log("THSI :: " + JSON.stringify(req.body.email));
      User.findOne(req.body, function(err, users){
        if(err){
          res.send(err.message);
          console.log("Wrong email or password");
        }
        else {
          console.log("users   " + users.id);
          req.session.uid = users.id;
          console.log("User   " + users.id);
          res.redirect('/getUserProjects');
        }
      });
  }

}
module.exports = userController;
