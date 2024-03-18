const mongoose = require('mongoose');
const plm = require('passport-local-mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/WhatsappClone");

const userSchema = mongoose.Schema({
  username :{
    type:String,
    required:[true,"username is must for registering new user"]
  },
  password:String,
  profilePicture :{
    type:String,
    default:'default.jpg'
  },
  email:String,
  socketId : String,
  friends : [
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:'user'
    }
  ],

  

});

userSchema.plugin(plm);

module.exports = mongoose.model("user",userSchema);



