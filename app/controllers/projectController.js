let Project = require('../models/Project');

let projectController = {

    //Get All Projects
    getAllProjects:function(req, res){

        Project.find(function(err, projects){

            if(err)
                res.send(err.message);
            else
                // res.render('index', {projects});
                res.render('index');
                // console.log('kdkdk');
        })
    },

    //Create Porject
    createProject:function(req, res){
        let project = new Project(req.body);

        project.save(function(err, project){
            if(err){
                res.send(err.message)
                console.log(err);
            }
            else{

                console.log(project);
                res.redirect('/');
            }
        })
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

    //User projects
    getProjectsbyUsers:function(req, res, next){
      var userId = req.params._userId;
      Project.find(userId, function(err, projects){
        if(err){
          res.send(err.message);
        }
        else {
          // Not sure yet
          res.json(projects);
        }
      })
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
