import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../store/Auth"
import {toast} from "react-toastify"

const Register = () => {

  const navigate = useNavigate()

  const {storeTokenInLS} = useAuth()

  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  })

  const handleInput = (e) => {
    // console.log(e);
    let name = e.target.name
    let value = e.target.value

    setUser({
      ...user, [name]: value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      })
      const res_data = await response.json()
      console.log(res_data);
      if (response.ok) {
        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
        })
        storeTokenInLS(res_data.token)
        navigate("/")
        toast.success(res_data.message)

      }
      else{
        toast.error(res_data.message)
      }
    }
    catch (error) {
      console.log("register", error);
    }

  }

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
          <div className="container">
              <h1 className="main-heading">Registration</h1>
            </div>
            <div className="container grid grid-two-cols">
              <div className="registration-image">
                <img src="./images/register.png" alt="A Girl Is Trying To Do Registration" width="500" height="400" />
              </div>
              <div className="registration-form">
                {/* <h1 className="main-heading mb-3">Sign Up</h1>
                <br /> */}
                <form onSubmit={handleSubmit} >
                  <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" placeholder="Username" id="username" required autoComplete="off" value={user.username} onChange={handleInput} />
                  </div>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="Enter Your Email" id="email" required autoComplete="off" value={user.email} onChange={handleInput} />
                  </div>
                  <div>
                    <label htmlFor="phone">Phone</label>
                    <input type="number" name="phone" placeholder="Enter Your Phone" id="phone" required autoComplete="off" value={user.phone} onChange={handleInput} />
                  </div>
                  <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="Enter Your Password" id="password" required autoComplete="off" value={user.password} onChange={handleInput} />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">Register Now</button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  )
}

export default Register