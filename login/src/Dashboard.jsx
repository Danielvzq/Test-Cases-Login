export default function Dashboard({ onLogout }) {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "20%",
        fontFamily: "Arial",
      }}
    >
      <h1>Welcome to the Dashboard 🎉</h1>
      <p>You have successfully logged in.</p>
      <button
        onClick={onLogout}
        style={{
          padding: "10px 20px",
          backgroundColor: "crimson",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Log out
      </button>
    </div>
  )
}
