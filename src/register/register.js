import axios from 'axios';
import React, { useState } from 'react';
import './register.css';
import { Link } from 'react-router-dom';


const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [flash,setFlash] = useState({
        success: false,
        message: ""
    });


    const handleRegister = async (e) => {
        e.preventDefault();
        // console.log(name, email, password);
        axios.post('http://localhost:1234/api/register', {
            name,
            email,
            password
        }).then((res) => {
            if (res.data.status == 200) {
                setFlash({
                    success: true,
                    message: "Pendaftaran berhasil! Selamat datang di aplikasi kami."
                }) 
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
            {flash.success && <div class="flash-message-warning">{flash.message}<Link className='a' to="/">Login</Link></div>}
            <form onSubmit={handleRegister}>
                <h1>Register</h1>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} id="name" name="name" placeholder="Enter your name"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" placeholder="Enter your email"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" name="password" placeholder="Enter your password"></input>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Register;