import React, { useState, useEffect } from "react";
import './styles/login.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Config from "../config";

interface FlashMessage {
    success: boolean;
    message: string;
}

const Login: React.FC = () => {
    const history = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [status, setStatus] = useState<number>(0);
    const [flash, setFlash] = useState<FlashMessage>({
        success: false,
        message: ""
    });
    const [fadeOut, setFadeOut] = useState<boolean>(false);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${Config.api.server1}/api/login`, {
                email,
                password
            });

            if (res.data.status === 200) {
                setFlash({
                    success: true,
                    message: "Login Berhasil"
                });

                localStorage.setItem("token", res.data.token);
                localStorage.setItem("email", res.data.email);
                history("/home");
            } else {
                setStatus(res.data.status);
                setFlash({
                    success: false,
                    message: "Username atau password salah"
                });
            }
        } catch (err) {
            console.error(err);
            setFlash({
                success: false,
                message: "Email atau password salah!"
            });
        }
    };

    useEffect(() => {
        if (flash.message) {
            const timer = setTimeout(() => {
                setFadeOut(true);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [flash.message]);

    return (
        <div className="container">
            {flash.message && (
                <div className={`flash-message ${flash.success ? 'flash-message-success' : 'flash-message-error'} ${fadeOut ? 'fade-out' : ''}`}>
                    {flash.message}
                </div>
            )}
            <form onSubmit={handleLogin}>
                <h1>Login</h1>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Enter email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Enter password"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Masuk</button>
            </form>

            <h4>atau belum punya akun?</h4>
            <div className="register">
                <a href="/register" className="btn btn-success">Daftar</a>
            </div>
        </div>
    );
};

export default Login;
