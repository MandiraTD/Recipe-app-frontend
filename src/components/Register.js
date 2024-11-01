import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../css/Login.css"; 
import Logo from '../icons/logo.PNG';

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmPw: ""
  });
  const [error, setError] = useState("");
  const [passwordFocus, setPasswordFocus] = useState(false);
  const [passwordValidations, setPasswordValidations] = useState({
    hasLowercase: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasMinLength: false
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      setPasswordValidations({
        hasLowercase: /[a-z]/.test(value),
        hasUppercase: /[A-Z]/.test(value),
        hasNumber: /\d/.test(value),
        hasSpecialChar: /[@$!%*?&]/.test(value),
        hasMinLength: value.length >= 8
      });
    }
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const { email, password, confirmPw } = formData;

    // Validate email and password
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email format.");
      return;
    }
    if (password !== confirmPw) {
      setError("The passwords do not match.");
      return;
    }

    try {
      const response = await API.post("/auth/register", formData);
      alert(response.data.message);
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
        confirmPw: ""
      });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="register-box">
        <img src={Logo} alt="logo" />
        <p className="login">Register</p>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              name="firstname"
              placeholder="First name.."
              value={formData.firstname}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last name.."
              value={formData.lastname}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email.."
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Contact number.."
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password.."
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
              required
            />
            {passwordFocus && (
              <div className="password-hints">
                <p className={passwordValidations.hasLowercase ? "valid" : "invalid"}>
                  {passwordValidations.hasLowercase ? "✔" : "✖"} At least one lowercase letter
                </p>
                <p className={passwordValidations.hasUppercase ? "valid" : "invalid"}>
                  {passwordValidations.hasUppercase ? "✔" : "✖"} At least one uppercase letter
                </p>
                <p className={passwordValidations.hasNumber ? "valid" : "invalid"}>
                  {passwordValidations.hasNumber ? "✔" : "✖"} At least one number
                </p>
                <p className={passwordValidations.hasSpecialChar ? "valid" : "invalid"}>
                  {passwordValidations.hasSpecialChar ? "✔" : "✖"} At least one special character
                </p>
                <p className={passwordValidations.hasMinLength ? "valid" : "invalid"}>
                  {passwordValidations.hasMinLength ? "✔" : "✖"} Minimum 8 characters
                </p>
              </div>
            )}
            <input
              type="password"
              name="confirmPw"
              placeholder="Confirm password.."
              value={formData.confirmPw}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="register-button">Create Account</button>
        </form>
        <br />
        <p style={{ marginTop: "80px", textAlign: "center" }}>
          Already have an account? <a href="/login" style={{ textDecoration: "none", color: "red" }}>Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
