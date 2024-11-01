import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Login.css";
import Logo from '../icons/logo.PNG';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); 

        try {
            const response = await axios.post("http://16.171.153.121:5000/api/auth/login", {
                email,
                password,
            });
            
            localStorage.setItem("token", response.data.token);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred. Please try again.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <img src={Logo} alt="logo" />
                <p className="login" style={{fontSize:"28px", marginBottom:"25px"}}>Login</p>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email address</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    />
                    <button type="submit">SIGN IN</button>
                    
                  
                    {error && <span className="error-message">{error}</span>}
                </form>
                <p>Don't have an account? <a href="/register">Create an account</a></p>
            </div>
        </div>
    );
};

export default Login;
