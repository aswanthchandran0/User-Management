const checkUserStatus = (req,res,next) =>{
    if(req.user && req.user.isBlocked){
        res.clearCookie('jwt')
        res.redirect('/login')
    }else{
        next()
    }
}

export default checkUserStatus