import { useEffect, useState } from "react"
import { useAuth } from "../store/Auth"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"

const AdminUsers = () => {

  const { authorizationToken } = useAuth()
  const [users, setUsers] = useState([])

  const getAllUsersData = async () => {
    try {
      let response = await fetch("http://localhost:8000/api/admin/user", {
        method: "GET",
        headers: {
          "Authorization": authorizationToken
        }
      })
      const data = await response.json()
      setUsers(data)
      // console.log(data);
    }
    catch (error) {
      console.log(error);
    }
  }


  const deleteUser = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/admin/user/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": authorizationToken
        }
      })
      if (response.ok) {
        await response.json()
        toast.success("User Deleted Successfull")
        getAllUsersData()
      }
      else{
        toast.error("User Deleted UnSuccessfull")
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllUsersData()
  }, [])

  return (

    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">Admin Users Data</h1>
        </div>

        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((item, index) => {
                  return <tr key={index}>
                    <td>{item._id}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td><Link to={`/admin/users/${item._id}/edit`}>Edit</Link></td>
                    <td><button onClick={() => deleteUser(item._id)} >Delete</button></td>
                  </tr>
                })
              }
            </tbody>
          </table>
        </div>
      </section>
    </>
  )
}

export default AdminUsers