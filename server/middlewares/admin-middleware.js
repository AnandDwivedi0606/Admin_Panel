const adminMiddleware = async (req,res,next)=>{
  try {
    const isAdmin = req.user.isAdmin
    console.log(isAdmin);
    if (!isAdmin) {
      return res.status(403).json({message:"Access Denied \n User is not Admin"})
    }
    // return res.status(200).json(req.user)
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = adminMiddleware