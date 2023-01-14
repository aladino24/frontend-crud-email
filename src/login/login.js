import React, { useState } from "react";
import './login.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const history = useNavigate();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [status,setStatus] = useState(0);
    const [flash,setFlash] = useState({
        success: false,
        message: ""
    });


    const handleLogin = async(e) => {
        e.preventDefault();
        axios.post('http://localhost:1234/api/login', {
            email,
            password
        }).then((res) => {
            if (res.data.status == 200) {
                setFlash({
                    success: true,
                    message: "Login Berhasil"
                }); 
                // insert res.data.token ke local storage
                localStorage.setItem("token", res.data.token);
                history("/home");
            }else{
                setStatus(res.data.status)
            }
        }).catch((err) => {
            console.log(err);
            setFlash({
                success: true,
                message: "Email atau password salah!"
            })
        });
    }

    return (
        <div className="container">
            {status == 401 && <div class="flash-message-salah">Username atau password salah</div>}
            <form onSubmit={handleLogin}>
                <h1>Login</h1>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" placeholder="Enter email"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" placeholder="Enter password"></input>
                </div>
                <button type="submit" className="btn btn-primary">Masuk</button>
            </form>

            <h4>atau belum punya akun?</h4>
            {/* tag a untuk button */}
            <div className="register">
                <a href="/register" className="btn btn-success">Daftar</a>
            </div>
        </div>
    );
}

export default Login;