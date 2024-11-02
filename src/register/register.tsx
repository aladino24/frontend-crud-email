import axios from 'axios';
import React, { useState, FormEvent, ChangeEvent } from 'react';
import './styles/register.css';
import { Link } from 'react-router-dom';
import Config from '../config';

interface FlashMessage {
    success: boolean;
    message: string;
}

const Register: React.FC = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [flash, setFlash] = useState<FlashMessage>({
        success: false,
        message: ""
    });

    const handleRegister = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const res = await axios.post(`${Config.api.server1}/api/register`, {
                name,
                email,
                password
            });

            if (res.data.status === 200) {
                setFlash({
                    success: true,
                    message: "Pendaftaran berhasil! Selamat datang di aplikasi kami."
                });
            }
        } catch (err) {
            console.error(err);
            setFlash({
                success: true,
                message: "Email atau password salah!"
            });
        }
    };

    return (
        <div className="container">
            {flash.success && (
                <div className="flash-message-warning">
                    {flash.message}
                    <Link className='a' to="/">Login</Link>
                </div>
            )}
            <form onSubmit={handleRegister}>
                <h1>Register</h1>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        value={name}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                        id="name"
                        name="name"
                        placeholder="Enter your name"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        value={email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter your email"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        value={password}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter your password"
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default Register;
