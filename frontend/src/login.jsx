import { useState } from "react";
import api from "./api";

function Login({ setAuth }) {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("login/", { username, password });
      localStorage.setItem("token", res.data.token);
      setAuth(true);
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("signup/", { username, password });
      localStorage.setItem("token", res.data.token);
      setAuth(true);
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.left}>
        <h1 style={styles.logo}>Task Management</h1>
        <p style={styles.tagline}>Manage your daily tasks.</p>
      </div>

      <div style={styles.right}>
        <div style={styles.card}>
          {error && <div className="alert alert-danger py-2 fs-6">{error}</div>}
          <form onSubmit={isSignup ? handleSignup : handleLogin} style={styles.form}>
            <input
              style={styles.input}
              placeholder="Email or username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <input
              style={styles.input}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button style={styles.loginBtn}>
              {isSignup ? "Sign Up" : "Log In"}
            </button>

            {!isSignup && <p style={styles.forgot}>Forgotten password?</p>}

            <div style={styles.line}></div>

            <button
              type="button"
              style={styles.signupBtn}
              onClick={() => {
                setIsSignup(!isSignup);
                setError("");
              }}
            >
              {isSignup ? "Already have an account?" : "Create new account"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

const styles = {
  container: { display: "flex", height: "100vh", justifyContent: "center", alignItems: "center", background: "#f0f2f5", padding: "20px", fontFamily: "Arial" },
  left: { flex: 1, padding: "40px" },
  logo: { fontSize: "60px", color: "#1877f2", marginBottom: "10px", fontWeight: "bold" },
  tagline: { fontSize: "22px", color: "#1c1e21", maxWidth: "400px" },
  right: { flex: 1, display: "flex", justifyContent: "center" },
  card: { background: "#fff", padding: "20px", borderRadius: "10px", boxShadow: "0 2px 15px rgba(0,0,0,0.15)", width: "360px" },
  form: { display: "flex", flexDirection: "column" },
  input: { marginBottom: "10px", padding: "14px", fontSize: "16px", border: "1px solid #ddd", borderRadius: "6px", outline: "none" },
  loginBtn: { background: "#1877f2", color: "#fff", padding: "12px", border: "none", borderRadius: "6px", fontSize: "18px", cursor: "pointer", fontWeight: "bold" },
  signupBtn: { background: "#42b72a", color: "#fff", padding: "12px", border: "none", borderRadius: "6px", fontSize: "16px", cursor: "pointer", fontWeight: "bold" },
  forgot: { textAlign: "center", fontSize: "14px", color: "#1877f2", marginTop: "10px", cursor: "pointer" },
  line: { height: "1px", background: "#ddd", margin: "15px 0" }
};