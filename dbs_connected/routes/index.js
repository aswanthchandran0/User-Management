var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const userModel = require('../public/javascripts/usermodel')
const bcrypt = require('bcrypt');
var app = express();

  


/* GET home page. */
router.get('/', function (req, res, next) {
  if(req.cookies.user){
    res.redirect('user')
  }else{
    res.render('index', { title: 'Express' });
  }
});

router.post('/signin', async (req, res) => {
  const { username, email, password, cpassword } = req.body;

  if (password == cpassword) {
    try {
      const existingUser = await userModel.findOne({ email: email })
      if (existingUser) {
        return res.render('index', { error: 'user already exists' })
      }
      // Generate a salt and hash the password
      const saltRounds = 10; // You can adjust the number of salt rounds as needed
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Create a new user document
      const newUser = new userModel({
        username: username,
        email: email,
        password: hashedPassword, // Store the hashed password
      });
      // Log the user in after successful registration

      res.cookie('user', newUser, { maxAge: 3600000, httpOnly: true })
      // Save the user to the database
      await newUser.save();

      res.redirect('user')
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    return res.render('index', { errors: 'password not match' })
  }

});


//Login route

router.post('/login', async (req, res) => {

  
  console.log(req.body)
  const { email, password} = req.body

  try {
    const user = await userModel.findOne({ email: email })
    if (!user) {
      return res.render('index', { emailerror: 'user not existing' })
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.render('index', { passworderror: 'Incorrect password' })
    }
    res.cookie('user', user, { maxAge: 3600000, httpOnly: true })
      res.redirect('user');

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
})


router.get('/', (req, res) => {
  res.redirect('user');
});

router.post('/logout',(req,res)=>{
  res.clearCookie('user')
  res.render('index')
})

module.exports = router;
