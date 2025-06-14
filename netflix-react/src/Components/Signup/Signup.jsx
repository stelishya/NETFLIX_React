import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

import styles from  './Signup.module.css'
import symbol from '/symbol.png'

const errorMessages = {
  "auth/email-already-in-use": "This email is already registered.",
  "auth/weak-password": "Password should be at least 6 characters.",
  "auth/invalid-credential": "Incorrect Email or Password.",
};

export default function Signup(){
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({});
  const navigate = useNavigate()

  const validate = () => {
    const err = {};

    if (formData.userName.trim().length < 3)
      err.userName = "Name must be at least 3 characters";

    if (!formData.email.trim().match(/^\S+@\S+\.\S+$/))
      err.email = "Enter a valid email";

    if (formData.password.trim().length < 6)
      err.password = "Password must be at least 6 characters";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // const handleChange = (e) => {
  //   const { name, value, type, checked } = e.target
  //   setFormData({
  //     ...formData,
  //     [name]: type === 'checkbox' ? checked : value,
  //   })
  // }
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    console.log("formData : ",formData)
    try{
      const result = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log("User created:", result.user.uid);
      if (result.user) {
        console.log("Result:",result.user)
      await updateProfile(result.user, { displayName: formData.userName });
      console.log("Profile updated");
      console.log("hii")
      await setDoc(doc(db, "User", result.user.uid), {
        name: formData.userName,
        email: formData.email,
      });
      console.log("Firestore write success");
      toast.success("Signup successful! Please log in.");
      console.log("hello user")
      navigate("/login", { replace: true });
      // setSpinner(false);
    }
    }catch(err){
      console.error("Signup Error:", err);
      const errorCode = err.code;
      const message =
        errorMessages[errorCode] || "Something went wrong , Please try again";
      toast.error(message);
      
    }
    console.log('Signup Data:', formData)
    navigate('/login') // Redirect to login after signup
  }

  return (
    <div className={styles.container}>
    <div className={styles.signupContainer}>
      <div className={styles.leftPanel}></div>
      <div className={styles.rightPanel}>
        <img src={symbol} alt="Netflix Logo" />
        <h1>Sign up</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles.nameFields}>
            <input
              type="text"
              name="userName"
              placeholder="Username"
              value={formData.userName}
              onChange={handleChange}
              required
            />
            {/* <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            /> */}
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email "
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Create New Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className={styles.SignupBtn}>Sign up</button>

          {/* <div className="remember-me">
            <label>
              <input
                type="checkbox"
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
              />
              Remember me
            </label>
          </div>

          <div className="social-login">
            <span>Or</span>
            <button className="facebook-btn">Facebook</button>
          </div> */}
        </form>
        <p className={styles.signinLink}>
          Already have an account? <span onClick={() => navigate('/login')}>Sign in</span>
        </p>
      </div>
    </div>
    </div>
  )
}
