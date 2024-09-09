const User = require("../models/user-model")
const bcrypt = require("bcryptjs")

const home = async (req, res) => {
  try {
    res.status(200).send("Welcome To World Using Router")
  } catch (error) {
    res.status(404).send(error.message)
  }
}

// registering a New User

const register = async (req, res, next) => {

  try {

    // destructure the request body
    const { username, email, phone, password } = req.body

    // Checking the email Id whether the email is already registered or not

    const userExist = await User.findOne({ email })

    if (userExist)
      // return res.status(400).send("Email Already Exists")
      return res.status(400).json({ message: 'Email already exists' })


    // if not then register the user

    const userCreated = await User.create({ username, email, phone, password })

    res.status(201).json({ message: "Registration Successfull", token: await userCreated.generateToken(), userId: userCreated._id.toString() })
  } catch (error) {
    // res.status(500).json({ msg: "Internal Server Error" })
    next(error)
  }
}


// To Login User

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const userExist = await User.findOne({ email })
    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" })
    }

    // const user = await bcrypt.compare(password, userExist.password)
    const user = await userExist.comparePassword(password)

    if (user) {
      res.status(200).json({ message: "Login Successfully", token: await userExist.generateToken(), userId: userExist._id.toString() })
    }
    else {
      res.status(401).json({ message: "Invalid Email Or Password" })
    }

  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" })
  }
}

const user = async (req, res) => {
  try {
    const userData = req.user
    console.log(userData);
    return res.status(200).json({ userData: userData, token: req.token, id: req.id })
  } catch (error) {
    console.log("Error from the root", error);
  }
}





module.exports = { home, register, login, user }