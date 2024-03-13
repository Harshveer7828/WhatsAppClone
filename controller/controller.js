var express = require('express');
var router = express.Router();


const register = function(req, res, next) {
    res.render('../views/auth/register.ejs');
  }

const home = (req,res,next) =>{
  res.render('../views/home.ejs');
}

const login = (req,res,next) =>{
  res.render('../views/auth/login.ejs');
}




module.exports = {
  register,
  home,
  login,
}