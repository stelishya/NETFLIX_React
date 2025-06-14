import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import styles from "./Login.module.css";
import logo from "../../assets/logo.png"

function Login(){
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
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
        {/* <h1 className={styles.logo}>NETFLIX</h1> */}
        <form className={styles.form} onSubmit={(e)=>{
          e.preventDefault()
          handleLogin();
          }}>
          <h2>Sign In</h2>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
          <button type="submit">Sign In</button>

          {/* <div className={styles.orDivider}>OR</div>

          <button type="button" className={styles.codeButton}>
            Use a sign-in code
          </button> */}

          <a href="#" className={styles.forgotLink}>Forgot password?</a>
            <p className={styles.signinLink}>
                New to Netflix? <span onClick={() => navigate('/signup')}>Sign up now.</span>
            </p>
          {/* <div className={styles.rememberMe}>
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div> */}
        </form>
      </div>
    </div>
    )
}
export default Login