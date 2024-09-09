import { NavLink, Outlet, useNavigate } from "react-router-dom"
import { FaUser, FaEnvelope, FaRegListAlt, FaHome } from "react-icons/fa";
import { useAuth } from "../../store/Auth";

const AdminLayout = () => {

  const { user, isLoading } = useAuth()
  const navigate = useNavigate()

  if (isLoading) {
    return <h1>Loading......</h1>
  }

  if (!user.isAdmin) {
    navigate("/")
  }

  return (
    <>
      <header>
        <div className="container">
          <nav>
            <ul>
              <li><NavLink to="/admin/users" ><FaUser />Users</NavLink></li>
              <li><NavLink to="/admin/contacts" ><FaEnvelope />Contacts</NavLink></li>
              {/* <li><NavLink to="/services" ><FaRegListAlt />Services</NavLink></li>
              <li><NavLink to="/" ><FaHome />Home</NavLink></li> */}
            </ul>
          </nav>
        </div>
      </header>
      <Outlet />
    </>
  )
}

export default AdminLayout