const mongoose = require('mongoose');

const plm = require('passport-local-mongoose');

const userSchema = mongoose.Schema({
  username : {
    type:String,
    required:[true,"username is must"]
  },
  password : {
    type:String
  },
  subscribers : [{
    type:mongoose.Schema.Types.ObjectId,
    ref :"user"
  }],
  subscribe : [{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  }],
  profileImage : {
    type: String
  },
  videos : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "video"
  }],
  like : [{
    type : mongoose.Schema.Types.ObjectId,
    ref:"user"
  }]

})

mongoose.plugin(plm);
module.exports = router;
