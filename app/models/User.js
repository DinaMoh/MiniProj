var mongoose =  require('mongoose');

var userSchema = mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  username:{
    type:String,
    required:true,
    unique:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  avatarPath:{
    type:String,
    required:true
  }
})

var User = mongoose.model("user", userSchema);

module.exports = User;
