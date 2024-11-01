import React from "react";
import { Link } from "react-router-dom";
import '../css/Home.css'; 

const Home = () => {
    return (
        <div className="home-container">
            <header className="header">
                <h1 style={{marginTop:"30px", fontSize:"50px"}}>Welcome to the Recipe App</h1>
                <nav className="nav">
                    <Link className="nav-link" to="/login">Login</Link>
                    <Link className="nav-link" to="/register">Register</Link>
                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                </nav>
            </header>
           
        </div>
    );
};

export default Home;
