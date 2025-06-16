import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";

import styles from "./Login.module.css";
import logo from "../../assets/logo.png"
import Navbar from "../Navbar/Navbar";

function Login(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
      navigate("/home");
    } catch (err) {
      toast.error("Login failed: " + err.message);
    }
  };

    return (
        <div className={styles.loginWrapper}>
      <div className={styles.overlay}></div>

      <div className={styles.loginContainer}>
          <Navbar/>
        {/* <h1 className={styles.logo}>NETFLIX</h1> */}
        <form className={styles.form} onSubmit={handleLogin}>
          <h2>Sign In</h2>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
          <button type="submit">Sign In</button>

          <a href="#" className={styles.forgotLink}>Forgot password?</a>
            <p className={styles.signinLink}>
                New to Netflix? <span onClick={() => navigate('/signup')}>Sign up now.</span>
            </p>          
        </form>
      </div>
    </div>
    )
}
export default Login