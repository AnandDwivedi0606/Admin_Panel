import { useEffect, useState } from "react"
import { useAuth } from "../store/Auth"

const AdminContacts = () => {

  const [contact, setContact] = useState([])
  const { authorizationToken } = useAuth()

  const getAllContact = async () => {
    const response = await fetch("http://localhost:8000/api/admin/contact", {
      method: "GET",
      headers: {
        "Authorization": authorizationToken
      }
    })
    if (response.ok) {
      const data = await response.json()
      setContact(data)
    }
  }

  const deleteContact = async (id) => {
    try {
      const response = await fetch(`http://localhost:8000/api/admin/contact/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": authorizationToken
        }
      })
      if (response.ok) {
        await response.json()
        getAllContact()
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllContact()
  }, [])

  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">Admin Contact Data</h1>
        </div>

        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {
                contact.map((item, index) => {
                  return <tr key={index}>
                    <td>{item._id}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{item.message}</td>
                    <td><button onClick={() => updateUserById(item._id)} >Edit</button></td>
                    <td><button onClick={() => deleteContact(item._id)} >Delete</button></td>
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

export default AdminContacts