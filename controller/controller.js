var express = require('express');
var router = express.Router();


const register = function(req, res, next) {
    res.render('../views/auth/register.ejs');
  }





module.exports = {
    register,


}