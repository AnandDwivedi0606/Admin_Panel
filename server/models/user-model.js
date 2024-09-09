const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
})

// To bcrypt the password before save, if the password is changed or new user created before saving the password to the database this function activates and bcrypt our password 

userSchema.pre("save", async function (next) {

  // in this pre method this has access of all data inside req.body

  const user = this;

  if (!user.isModified("password")) {
    next();
  }
  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(user.password, saltRound);
    user.password = hash_password;
  } catch (error) {
    next(error);
  }
})

// To compare Password

userSchema.methods.comparePassword = function (password){
  return bcrypt.compare(password,this.password);
}

// To generate Token

userSchema.methods.generateToken = function () {
  try {
    return jwt.sign({
      userid: this._id.toString(),
      email: this.email,
      isAdmin: this.isAdmin
    }, process.env.JWT_SECRET_KEY, {
      expiresIn: "30d"
    })
  } catch (error) {
    console.log(error);
  }
}

const User = new mongoose.model("User", userSchema)

module.exports = User