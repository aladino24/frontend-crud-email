import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from './styles/User.module.css';
import { useNavigate } from "react-router-dom";
import Config from "../config";

interface UserData {
    _id: string;
    name: string;
    date: string;
}

const User: React.FC = () => {
    const [user, setUser] = useState<UserData[]>([]);
    const navigate = useNavigate();

    const getUser = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await axios.get(`${Config.api.server1}/api/getuser`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            const data = res.data;
            setUser(data.data);
        } catch (err: any) {
            if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                localStorage.removeItem("token");
                localStorage.removeItem("email");
                navigate("/", { replace: true });
            } else {
                console.error(err);
            }
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    const handleViewLoginHistory = (userId: string) => {
        navigate(`/user/${userId}/login-history`);
    };

    return (
        <div className={styles["container-user"]}>
            <h3>Daftar User</h3>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Tanggal Pembuatan Akun</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        user.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td> 
                                <td>{item.name}</td>
                                <td>{new Date(item.date).toLocaleDateString()}</td> 
                                <td>
                                    <button 
                                        onClick={() => handleViewLoginHistory(item._id)} 
                                        className={styles.history_login} 
                                    >
                                        Detail History Login
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default User;
