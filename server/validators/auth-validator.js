const { z } = require("zod")


// Createing an Object Schema

const signUpSchema = z.object({

  username: z
    .string({ required_error: "Username is Required" })
    .trim()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(30, { message: "Username must be less than 30 characters" }),

  email: z
    .string({ required_error: "Email is Required" })
    .trim()
    .email({ message: "Invalid Email Address" })
    .min(3, { message: "Email must be at least 3 characters" })
    .max(30, { message: "Email must be less than 30 characters" }),

  phone: z
    .string({ required_error: "Phone is Required" })
    .trim()
    .min(10, { message: "Phone must be 10 characters" })
    .max(10, { message: "Phone must be 10 characters" }),

  password: z
    .string({ required_error: "Password is Required" })
    .trim()
    .min(7, { message: "Password must be at least 3 characters" })
    .max(30, { message: "Password must be less than 30 characters" }),

})


const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is Required" })
    .trim()
    .email({ message: "Invalid Email Address" })
    .min(3, { message: "Email must be at least 3 characters" })
    .max(30, { message: "Email must be less than 30 characters" }),

  password: z
    .string({ required_error: "Password is Required" })
    .trim()
    .min(7, { message: "Password must be at least 3 characters" })
    .max(30, { message: "Password must be less than 30 characters" }),
})


module.exports = { signUpSchema, loginSchema }