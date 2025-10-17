import { useState } from "react"
import Login from "./Login"
import Dashboard from "./Dashboard"

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"))

  const handleLogin = (newToken, remember) => {
    if (remember) localStorage.setItem("token", newToken)
    else sessionStorage.setItem("token", newToken)
    setToken(newToken)
  }

  const handleLogout = () => {
    localStorage.removeItem("token")
    sessionStorage.removeItem("token")
    setToken(null)
  }

  return (
    <>
      {!token ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard onLogout={handleLogout} />
      )}
    </>
  )
}

export default App
