var express = require('express');
var router = express.Router();
const passport = require('passport');
const userModel =  require('./users.js');

const controller = require('../controller/controller');

/* GET home page. */


router.get('/',controller.register);
router.get('/index',(req,res) =>{
   res.render('index.ejs');
});




// *************** authentication code ********************************


//register route
router.post('/register',(req,res,next) =>{
  const userData = new userModel({
    username : req.body.username,
    email : req.body.email
  });
  
  userModel.register(userData,req.body.password)
  .then( (registereduser) => {
   passport.authenticate('local')(req,res, ()=> {
     res.redirect('/index');
    });
   });
});




//login route
router.post('/login',passport.authenticate('local',{
   successRedirect: '/index' ,
   failureRedirect: '/' 
}), (req, res) => {});


//logout route

router.get('/logout',(req,res,next) =>{
   req.logout( (err)=> { 
    if(err) return next(err);
   res.redirect('/')
   });
});
function isLoggedIn(req,res,next){
 if(req.isAuthenticated()){
    return next();
  }
 res.redirect('/');
}

module.exports = router;
