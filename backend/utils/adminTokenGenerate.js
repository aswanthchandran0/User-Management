import jwt from 'jsonwebtoken'

const generateAdminToken = (res,adminId)=>{
  const token = jwt.sign({adminId},process.env.ADMIN_SECRET,{expiresIn:'30d'})
  res.cookie('admin_jwt',token,{
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000
  })
}


export default generateAdminToken;