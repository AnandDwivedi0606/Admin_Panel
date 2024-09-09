require("dotenv").config()

const express = require("express")

const cors = require("cors")

const app = express()

const authRoute = require("./Router/auth-router")
const contactRoute = require("./Router/contact-router")
const serviceRoute = require("./Router/service-router")

const adminRoute = require("./Router/admin-router")

const connectdb = require("./utils/db")

const errormiddleware = require("./middlewares/error-middleware")

// handling cors

const corsOption = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true
}

app.use(cors(corsOption))

app.use(express.json())

app.use("/api/auth", authRoute)

app.use("/api/form", contactRoute)

app.use("/api/data", serviceRoute)



app.use("/api/admin", adminRoute)


app.use(errormiddleware)

connectdb().then(() => {
  app.listen(8000, () => {
    console.log("Server Is Running at http://localhost:8000");
  })
})