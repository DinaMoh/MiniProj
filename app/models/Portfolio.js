var mongoose = require('mongoose');

var portfolioSchema = mongoose.Schema({
  header:{
    type: String,
    required:true
  },
  ownerPhoto:{
    type: String
  }
})

var Portfolio = mongoose.model("portfolio", portfolioSchema);

module.exports = Portfolio;
