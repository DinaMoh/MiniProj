let User = require('../models/User');
// let Project = require('../models/Project');

let userController = {


  // home:function(req, res){
  //     req.session.destroy();
  //     res.render('index');
  //     console.log("Before Login : " + req.session.uid);
  // },

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
        res.redirect('/');
      }
    });
  },
  // postImg:function(req, res, next){
  //   upload.single();
  //   res.send(req.files);
  // },
  // router.post('/', upload.single(), function(req, res, next){
  //   res.send(req.files);
  // });

  //Get User by email and password
  loginUser:function(req, res){
      console.log("THSI :: " + JSON.stringify(req.body));
      User.findOne({email:req.body.email, password:req.body.password}, function(err, users){
        if(err){
          res.send(err.message);
          console.log("Wrong email or password");
        }
        else {
          console.log(users);
          console.log("users   " + users.id);
          req.session.uid = users.id;
          req.session.username = users.username;
          console.log("User   " + users.id);
          res.redirect('/getUserProjects');
        }
      });
  },

  logout:function(req, res){
    req.session.destroy();
    res.redirect('/');
  }

}
module.exports = userController;
