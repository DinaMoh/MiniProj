let Portfolio = require('../models/Portfolio');
let User = require('../models/User');
let Project = require('../models/Project');

let portfolioController = {

  getUserPort:function(req, res){
      Portfolio.find({_id: req.session.uid},function(err, port){
          if(err)
          {
              res.send(err.message);
          }
          else
          {
            res.json(port);
          }
      });
  },

  getTenPort:function(req, res){
    Portfolio.find(function(err, portfolios){
      var message = "";
      if(err)
        res.send(err.message);
      else{
        for(var i = 0; i<portfolios.length; i++){
          User.findOne({_id:portfolios[i].id}, function(err, user){
            console.log("USER = " + user.avatarPath);
            // Project.count({_id:user.id}, function(err, count){
              // console.log(count);
              res.render('index',{ports:portfolios, message:message, user:user});
            // });
          });
          // console.log("PLEASE = " + portfolios[i].id);
          // if(portfolios.hasOwnProperty('_id')){
          //   console.log("PLEASE = " + portfolios['_id']);
          // }
        }
        // console.log("PORTS = " + portfolios.id);
        // User.findOne({_id:portfolios.id}, function(err, user){
        //   console.log("USER = " + user.name);
        // });

      }
    });
  },
  // getTenPort:function(req, res, next){
  //   if(req.session.created){
  //     var message = req.session.created;
  //   }
  //   else {
  //     var message = "";
  //   }
  //   var no = req.params.no;
  //   Project.find({}, function(err, projects)
  //   {
  //     if(err){
  //       res.send(err.message);
  //     }
  //     else {
  //       var proj = Project.find({});
  //       console.log("noo" + Object.keys(proj).length);
  //       var pg = Math.ceil(((Object.keys(proj).length)/2)/10);
  //       var ck = (pg * 10) - 10;
  //       pg = pg + 1;
  //       console.log(pg);
  //       res.render('index', {projects : projects, pg : pg, ck:ck, message:message});
  //     }
  //   }).skip(no).limit(10);
  // },

  deleteAllPorts:function(req, res, next){
    Portfolio.remove(function(err, ports){
      if(err){
        res.send(err.message);
      }
      else {
        res.redirect('/');
      }
    });
  },

  createPort:function(req, res){
    let port = new Portfolio({_id:req.session.uid, header: req.session.username});
    port.save(function(err, portfolio){
      if(err){
        res.send(err.message);
      }
      else {
        // req.session.pid = portfolio.id;
        // console.log("USER " + req.session.uid);
        // res.json("port id  " + portfolio.id);
        // res.json("header " + portfolio.header);
      }
    });
  }

}
module.exports = portfolioController;
