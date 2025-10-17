import { useState } from "react"

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [show, setShow] = useState(false)
  const [error, setError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [success, setSuccess] = useState("")

  const validateEmail = (v) => {
    if (!v.includes("@")) {
      setEmailError("Invalid email format")
      return false
    }
    setEmailError("")
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!validateEmail(email)) return

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.message || "Login failed")

      // Guardar el token
      localStorage.setItem("token", data.token)

      // Mostrar mensaje de éxito
      setSuccess("Login successful!")
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div style={{ display:"flex", height:"100vh", justifyContent:"center", alignItems:"center" }}>
      <form noValidate onSubmit={handleSubmit}
        style={{ display:"flex", flexDirection:"column", gap:"10px", width:320, background:"#fff",
          padding:"2rem", borderRadius:10, boxShadow:"0 2px 8px rgba(0,0,0,0.2)" }}
      >
        <h2>Login</h2>

        <input data-testid="email-input" type="text" placeholder="Email"
               value={email} onChange={(e)=>setEmail(e.target.value)} />
        <p data-testid="email-error" style={{ color:"red", fontSize:12 }}>{emailError}</p>

        <div style={{ display:"flex", gap:8 }}>
          <input data-testid="password-input" type={show?"text":"password"} placeholder="Password"
                 value={password} onChange={(e)=>setPassword(e.target.value)} style={{ flex:1 }} />
          <button type="button" data-testid="password-toggle" onClick={()=>setShow(!show)}>
            {show ? "Hide" : "Show"}
          </button>
        </div>

        <p data-testid="error-text" style={{ color:"red", fontSize:13 }}>{error}</p>
        <p data-testid="success-text" style={{ color:"green", fontSize:13 }}>{success}</p>

        <button data-testid="submit-button" type="submit"
                style={{ padding:10, background:"#007bff", color:"#fff", border:"none", borderRadius:6 }}>
          Login
        </button>
      </form>
    </div>
  )
}
