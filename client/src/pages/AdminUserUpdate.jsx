import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../store/Auth"
import { toast } from "react-toastify"

const AdminUserUpdate = () => {

  const { id } = useParams()
  const { authorizationToken } = useAuth()
  const [data, setData] = useState({
    username: "",
    email: "",
    phone: ""
  })

  const navigate = useNavigate()

  const getUserData = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/admin/user/${id}`, {
        method: "GET",
        headers: {
          "Authorization": authorizationToken
        }
      })
      if (response.ok) {
        const data = await response.json()
        setData(data)
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData({
      ...data,
      [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch(`http://localhost:8000/api/admin/user/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": authorizationToken
        },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        toast.success("User Updated Succefully")
        navigate("/admin/users")
      } else {
        toast.error("User Updated Succefully")
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">Single User Data</h1>
        </div>
        {/* contact page main  */}
        <div className="container grid grid-two-cols">

          {/* contact form content actual  */}
          <section className="section-form">
            <form onSubmit={handleSubmit} >
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter Your Name"
                  autoComplete="off"
                  value={data.username}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter Your Email"
                  autoComplete="off"
                  value={data.email}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <label htmlFor="phone">Phone</label>
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  placeholder="Enter Your Phone"
                  autoComplete="off"
                  value={data.phone}
                  onChange={handleInput}
                  required
                />
              </div>

              <div>
                <button type="submit">Update</button>
              </div>
            </form>
          </section>
        </div>
      </section>
    </>
  )
}

export default AdminUserUpdate