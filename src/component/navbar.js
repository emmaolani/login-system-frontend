import React from "react";
import { Link } from "react-router-dom";

export default function NavBar(){
    return (
        <nav>
            <div className="logo">
                <p>LOGO</p>
            </div>
            <div className="nav-btn-cont">
                <Link to="/" className="nav-btn">Home</Link>
                <Link to="/" className="nav-btn">Templates</Link>
                <Link to="/" className="nav-btn">Services</Link>
                <Link to="/auth" className="nav-btn">Account</Link>
                <Link to="/" className="nav-btn">contact-us</Link>
            </div>
        </nav>
    )
}