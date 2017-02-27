var mongoose = require('mongoose');

var projectSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    URL:{
      type:String,
      required:true
    },
    uid:{
      type:String,
      required:true
    }
})

var Project = mongoose.model("project", projectSchema);

module.exports = Project;
