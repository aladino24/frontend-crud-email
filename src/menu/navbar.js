import React from "react";
import './style/navbar.css';
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwt from "jsonwebtoken";


const Navbar = () => {
    const history = useNavigate();
    const logout = async() => {
        // post data logout mengirimkan user_id dari jwt
        const token = localStorage.getItem("token");
        const decoded = jwt.decode(token);
        const _id = decoded.userId;
      
        axios.post('http://localhost:1234/api/logout', {
            _id
        }).then((res) => {
            localStorage.removeItem("token");
            history("/",{replace: true});
        }).catch((err) => {
            console.log(err);
        });
    }
    return (
       <nav className="navbar">
            <div>
                <div className="heading">
                    <Link className="title-header" to="/">
                            My App
                    </Link>
                </div>     
                <ul>
                    <div className="nav-menu">
                        <Link className="a" to="/home">
                            Home
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
}


export default Navbar;