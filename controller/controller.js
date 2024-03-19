const express = require('express');
const router = express.Router();
const userModel =  require('../routes/users.js');
const passport = require('passport');

const register = function(req, res, next) {
    res.render('../views/auth/register.ejs');
  }

const home =async (req,res,next) =>{
  // sending logged in user to the client side
  const loggedUser = await userModel.findOne({username : req.session.passport.user}).populate('friends');

  res.render('../views/home.ejs',{loggedUser});
}

const login = (req,res,next) =>{
  res.render('../views/auth/login.ejs');
}

const searchUsers =async (req,res,next) =>{
  const searchTerm = `^${req.body.data}`;
  const regex = new RegExp(searchTerm);
  const user = await userModel.find({username  : {$regex : regex ,$options : 'i'}});
  
  res.status(201).json(user,); 
}

const addFriend = async (req,res) =>{
  const loggedUser = await userModel.findOne({username : req.session.passport.user}).populate('friends');
  const user = await userModel.findOne({_id : req.params.userid});
  // await user.save();
  
  // now placing the checks that user is already friend or not -> if friend not added that guy if not than added him to the array
  
  if(loggedUser.friends.indexOf(user._id) === -1 && user.username !== loggedUser.username){
    loggedUser.friends.push(user._id);
    user.friends.push(loggedUser._id)
    console.log("ghusa")
  }
  
  await user.save();
  await loggedUser.save();
  res.redirect('back');
}

const conversation = async (req,res,next)=>{
  const user = await userModel.findOne({username : req.session.passport.user});
  const userChat = await userModel.findOne({username : req.params.username });
  res.redirect('back');

}





module.exports = {
  register,
  home,
  login,
  searchUsers,
  addFriend,
  conversation,
}