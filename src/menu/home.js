import React, { useEffect, useState } from "react";
import Calculator from "./calculator";
import Navbar from "./navbar";
import jwt from "jsonwebtoken";
import { useNavigate } from "react-router-dom";

const Home = () => {

    const history = useNavigate();
    const [nama,setNama] = useState('')

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwt.decode(token);
            console.log(decoded);
            if (decoded.exp < Date.now() / 1000) {
                localStorage.removeItem("token");
                history("/",{replace: true});
            }
        } else {
            history("/",{replace: true});
        }
    })

    return (
        <>
            <Navbar />
            <Calculator />
        </>
    );
}

export default Home;