const Contact = require("../models/contact-model")

const contactForm = async(req,res)=>{
  try {
    // const response = req.body
    // await Contact.create(response)


    const {username, email, message} = req.body
    await Contact.create({username, email, message})

    // console.log({username, email, message});

    return res.status(200).json({msg:"Message Send Succefully"})
  } 
  catch (error) {
    return res.status(500).json({msg:"Message Not Delivered"})
  }
}

module.exports = contactForm