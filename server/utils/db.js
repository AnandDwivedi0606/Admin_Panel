const mongoose = require("mongoose")

// const URI = "mongodb://localhost:27017/admin_panel"
const URI = process.env.MONGODB_URI

const connectdb = async () => {
  try {
    await mongoose.connect(URI)
    console.log("Database Connection Succefull");
  } catch (error) {
    console.error("Database Connection Fialed");
    process.exit(0)
  }
}

module.exports = connectdb