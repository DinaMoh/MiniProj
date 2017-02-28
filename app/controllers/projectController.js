let Project = require('../models/Project');
let User = require('../models/User');

let projectController = {

    //Get All Projects
    // var show = req.params.show;
    // if(!show)
    // {
    //   show = false;
    // }
    getAllProjects:function(req, res){
        Project.find(function(err, projects){

            if(err)
            {
                res.send(err.message);
            }
            else
            {
              res.render('index', {projects : projects})
              // res.render('index', {projects});
              // console.log('kdkdk');
            }
        })
    },

    //Create Porject
    createProject:function(req, res){
        req.body.uid = req.session.uid;
        let project = new Project(req.body);

        project.save(function(err, project){
            if(err){
                res.send(err.message)
                console.log(err);
            }
            else{
                console.log(project);
                res.redirect('/getUserProjects');
            }
        });
    },

    //Get single project
    //58b05338430c10210ffbb608
    findProject:function(req, res, next){
      var id = req.params._id;
      Project.findOne(id, function(err, projects){
        if(err){
          res.send(err.message);
        }
        else {
          //Redirect to single object view
          res.json(projects);
        }
      });
    },

    getUserProjects:function(req, res, next){

      var uid = req.session.uid;
      if(!(uid))
      {
        res.send("Can't login");
      }
      else {
        Project.find({uid: uid}, function(err, projects){
          if(err){
            res.send(err.message);
          }
          else {
            // user.name = "Dina";
            // var name = Dina;
            res.render('userproj', {projects : projects, username : req.session.username});
            // User.find({_id: uid}, function(err, users){
            //   if(err){
            //     res.send(err.message);
            //   }
            //   else {
            //     res.render('userproj', {projects}, {users});
            //   }
            // });
          }
        });
      }
      // console.log("gUP : " + uid);

    },

    //Delete Project
    deleteProject:function(req, res, next){
      var id = req.params._id;
      Project.remove(id, function(err, projects){
        if(err){
          res.send(err.message);
        }
        else {
          res.redirect('/');
        }
      });
    },

    deleteAllProjects:function(req, res, next){
      Project.remove(function(err, projects){
        if(err){
          res.send(err.message);
        }
        else {
          res.redirect('/');
        }
      });
    },

    //User projects
    getProjectsbyUser:function(req, res, next){
      var userId = req.params._userId;
      Project.find(userId, function(err, projects){
        if(err){
          res.send(err.message);
        }
        else {
          // Not sure yet
          res.json(projects);
        }
      });
    },

    viewSingleProj:function(req, res, next){
      var pid = req.params.id;
      Project.findOne({_id : pid}, function(err, project){
        if(err){
          res.send(err.message);
        }
        else {
          res.render('singleproj', {projects : project});
        }
      });
    }

    //Update Project
    // updateProject:function(req, res, next){
    //   var project = req.body;
    //   var updProject = {};
    //   var id = req.params.id;
    //
    //   if(project.title){
    //     updProject.title = project.title;
    //   }
    //
    //   if(project.URL){
    //     updProject.URL = project.URL;
    //   }
    //   if(!updProject){
    //     res.status(400);
    //     res.json({"error":"Wrong Data"});
    //   }
    //   else {
    //     Project.update(id, updProject, {}, function(err, project){
    //       if(err){
    //         res.send(err);
    //       }
    //       else {
    //         res.json(project);
    //       }
    //     });
    //   }
    // }

}

module.exports = projectController;
