import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../store/Auth"
import {toast} from "react-toastify"

const Login = () => {

  const navigate = useNavigate()
  const { storeTokenInLS } = useAuth()

  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const handleInput = (e) => {
    let name = e.target.name
    let value = e.target.value

    setUser({
      ...user, [name]: value,
    })

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
      })
      const res_data = await response.json()
      console.log(res_data);
      if (response.ok) {
        setUser({
          email: "",
          password: "",
        })
        // localStorage.setItem("Token", res_data.token)
        storeTokenInLS(res_data.token)
        toast.success(res_data.message);
        navigate("/")

      }
      else{
        toast.error(res_data.message)
      }
    } catch (error) {
      console.log("login", error);
    }
  }

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container">
              <h1 className="main-heading">Login</h1>
            </div>
            <div className="container grid grid-two-cols">
              <div className="registration-image">
                <img src="./images/login.png" alt="A Boy Is Trying To Do Login" width="500" height="400" />
              </div>
              <div className="registration-form">
                {/* <h1 className="main-heading mb-3">Login</h1> */}
                {/* <br /> */}
                <form onSubmit={handleSubmit} >
                  <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="Enter Your Email" id="email" required autoComplete="off" value={user.email} onChange={handleInput} />
                  </div>
                  <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="Enter Your Password" id="password" required autoComplete="off" value={user.password} onChange={handleInput} />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">Login</button>
                  <button className="btn secondary-btn"><NavLink to="/register">Sign Up</NavLink></button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  )
}

export default Login