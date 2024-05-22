var express = require('express');
var router = express.Router();
const userModel = require('../public/javascripts/usermodel')


router.get('/', async function(req,res,next){
    try {
        // Retrieve user data (email and username) from the database
        const users = await userModel.find({}, 'email username');
        res.render('admin', { users });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
})



router.post('/delete/:id', async  (req,res)=>{
  try{
    
    const userId = req.params.id
    const deleteUser = await userModel.findByIdAndRemove(userId)
    console.log('Deleted user:', deleteUser);
    if(!deleteUser){
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(204).send();
  }catch(error){
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
})



module.exports = router;