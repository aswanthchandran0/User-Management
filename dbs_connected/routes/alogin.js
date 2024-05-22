var express = require('express')
var router = express.Router()
var app = express();

const admin = {
    email:'admin@gmail.com',
    password:'admin123'
   }


router.get('/', function(req,res,next){
    res.render('alogin');
})

router.post('/logined', (req,res)=>{
    
    if(req.body.email === admin.email && req.body.password === admin.password){
        res.redirect('/admin')

    }else{
        return res.render('alogin', { aerror: 'access denied' })
    }
})


module.exports = router;