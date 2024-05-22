var express = require('express');
var router = express.Router();
const userModel = require('../public/javascripts/usermodel')

router.get('/edit/:_id', async (req, res) => {
  console.log(req.params._id);
  try {
    const userId = req.params._id;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.render('edituser', { user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/update/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }
    console.log(updateData);
    const updatedUser = await userModel.findByIdAndUpdate(userId, updateData)
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

   res.redirect('/admin')

  } catch {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
})


module.exports = router;