import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";
import ReactBigCalendar from "../components/ReactBigCalendar";
import axios from "axios";
import Config from "../config";

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [nama, setNama] = useState<string>('');

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            axios.get(`${Config.api.server1}/api/getuser`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((response) => {
                if (response.data && response.data.nama) {
                    setNama(response.data.nama);
                }
            })
            .catch((error) => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    localStorage.removeItem("token");
                    localStorage.removeItem("email");
                    navigate("/", { replace: true });
                } else {
                    console.error("Error fetching user data:", error);
                }
            });
        } else {
            navigate("/", { replace: true });
        }
    }, [navigate]);

    return (
        <>
            <Navbar />
            <ReactBigCalendar />
        </>
    );
}

export default Home;
