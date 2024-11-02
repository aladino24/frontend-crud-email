import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import styles from './styles/HistoryLogin.module.css'; 
import Config from "../config";

interface LoginHistoryRecord {
    _id: string;
    login_time: string; 
    logout_time?: string; 
}

const HistoryLogin: React.FC = () => {
    const { id } = useParams<{ id: string }>(); 
    const [loginHistory, setLoginHistory] = useState<LoginHistoryRecord[]>([]); 
    const navigate = useNavigate();

    const fetchLoginHistory = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${Config.api.server1}/api/get-history-login/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setLoginHistory(response.data);
        } catch (err) {
            if (axios.isAxiosError(err) && err.response && (err.response.status === 401 || err.response.status === 403)) {
                localStorage.removeItem("token");
                localStorage.removeItem("email");
                navigate("/", { replace: true });
            }
            
        }
    };

    useEffect(() => {
        fetchLoginHistory();
    }, [id]);

    return (
        <div className={styles.container}>
            <h3>Login History</h3>
            {loginHistory.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Login Time</th>
                            <th>Logout Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loginHistory.map((record, index) => (
                            <tr key={record._id}>
                                <td>{index + 1}</td>
                                <td>{new Date(record.login_time).toLocaleString()}</td>
                                <td>{record.logout_time ? new Date(record.logout_time).toLocaleString() : 'Belum Logout'}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Tidak ditemukan login history.</p>
            )}
        </div>
    );
};

export default HistoryLogin;
