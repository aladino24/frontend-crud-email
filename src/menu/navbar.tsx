import React from "react";
import './styles/navbar.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import jwt, { JwtPayload } from "jsonwebtoken";
import Config from "../config";

interface DecodedToken extends JwtPayload {
    userId: string;
}

const Navbar: React.FC = () => {
    const navigate = useNavigate();

    const logout = async () => {
        try {
            const token = localStorage.getItem("token");
            if (token) {
                const decoded = jwt.decode(token) as DecodedToken;
                
                if (decoded && decoded.userId) {
                    const _id = decoded.userId;
                    
                    await axios.post(`${Config.api.server1}/api/logout`, { _id });
                    
                    localStorage.removeItem("token");
                    localStorage.removeItem("email");
                    navigate("/", { replace: true });
                }
            }
        } catch (err) {
            console.error("Error during logout:", err);
        }
    };

    return (
        <nav className="navbar">
            <div>
                <div className="heading">
                    <Link className="title-header" to="/">
                        Big Calendar
                    </Link>
                </div>
                <ul>
                    <div className="nav-menu">
                        <Link className="a" to="/home">
                            Home
                        </Link>
                    </div>
                    <div className="nav-menu">
                        <Link className="a" to="/email">
                            Email
                        </Link>
                    </div>
                    <div className="nav-menu">
                        <Link className="a" to="/user">
                            User
                        </Link>
                    </div>
                    <div className="nav-menu">
                        <Link onClick={logout} className="a" to="/">
                            Logout
                        </Link>
                    </div>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
