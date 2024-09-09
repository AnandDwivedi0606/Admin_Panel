import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem("Token"))
  const [user, setUser] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [services, setServices] = useState([])
  const authorizationToken = `Bearer ${token}`

  // adding token in local storage
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken)
    return localStorage.setItem("Token", serverToken)
  }


  let isLoggedIn = !!token;



  // handle logout functionality by deleting token from local storage

  const logoutUser = () => {
    setToken("")
    return localStorage.removeItem("Token")
  }



  // JWT Authentication - to get the currently logged in User

  const userAuthentication = async () => {
    try {
      
      const response = await fetch("http://localhost:8000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },

      })

      if (response.ok) {
        const data = await response.json()
        console.log(data.userData);
        setUser(data.userData)
        setIsLoading(false)
      }

    } catch (error) {
      console.log("Error While Fetching User Data");
    }
  }

  const getServices = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/data/service", {
        method: "GET",
      })
      if (response.ok) {
        const data = await response.json()
        console.log(data.msg);
        setServices(data.msg)
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    userAuthentication()
    getServices()
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn, storeTokenInLS, logoutUser, user, services, authorizationToken, isLoading }} >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => {

  const AuthContextValue = useContext(AuthContext)

  if (!AuthContextValue) {
    throw new Error("useAuth used outside of the Provider")
  }

  return AuthContextValue
}

export { AuthContext, AuthProvider, useAuth }