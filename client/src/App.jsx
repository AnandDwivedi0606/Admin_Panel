import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Service from "./pages/Service"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Navbar from "./components/Navbar/Navbar"
import Error from "./pages/Error"
import Footer from "./components/Footer/Footer"
import Logout from "./pages/Logout"
import AdminLayout from "./components/layouts/AdminLayout"
import AdminUsers from "./pages/AdminUsers"
import AdminContacts from "./pages/AdminContacts"
import AdminUserUpdate from "./pages/AdminUserUpdate"

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Service />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/*" element={<Error />} />


          <Route path="/admin" element={<AdminLayout />}>
            <Route path="users" element={<AdminUsers />} />
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="users/:id/edit" element={<AdminUserUpdate />} />
          </Route>


        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )

}

export default App