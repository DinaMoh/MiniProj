let User = require('../models/User');
let Portfolio = require('../models/Portfolio');

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
    console.log("dddd  " + req.file.path);
    user.save({name:req.body.name, username:req.body.username, email:req.body.email, avatarPath:req.file.path}, function(err, user){
      if(err){
        res.send(err.message)
        console.log(err);
      }
      else {
        let port = new Portfolio({_id:user.id, header:user.name});
        port.save(function(err, portfolio){
          if(err){
            res.send(err.message);
          }
          else{
            console.log(user);
            res.redirect('/');
            req.session.destroy();
          }
        });
      }
    });
  },
  // var cpUp = upload.single('userPhoto');
  // createUser:function(req, res)
  // {
  //   console.log(req.file);
  // },
  // postImg:function(req, res, next){
  //   upload.single();
  //   res.send(req.files);
  // },
  // router.post('/', upload.single(), function(req, res, next){
  //   res.send(req.files);
  // });

  //Get User by email and password
  loginUser:function(req, res){
    req.session.destroy();
      console.log("THSI :: " + JSON.stringify(req.body));
      User.findOne({email:req.body.email, password:req.body.password}, function(err, users){
        if(err){
          res.send(err.message);
          console.log("Wrong email or password");
        }
        else {
          if(!users){
            res.send("Wrong email or password");
          }
          else {
            console.log(users);
            console.log("users   " + users.id);
            req.session.uid = users.id;
            req.session.username = users.username;
            req.session.pid = users.id;
            console.log("User   " + users.id);
            res.redirect('/getUserProjects');
          }
        }
      });
  },

  deleteAllUsers:function(req, res, next){
    User.remove(function(err, users){
      if(err){
        res.send(err.message);
      }
      else {
        res.redirect('/');
      }
    });
  },

  logout:function(req, res){
    req.session.destroy();
    res.redirect('/');
  }

}
module.exports = userController;
