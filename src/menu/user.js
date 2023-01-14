import React, { useEffect, useState } from "react";
import axios from "axios";
import './style/user.css';


const User = () => {
    const [user, setUser] = useState([]);
    var no = 1;
    // get user 
    const getUser = async() => {
        axios.get('http://localhost:1234/api/getuser').then((res) => {
            const data = res.data;
            setUser(data.data)
            console.log(user);
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        getUser();
    }, []);

    return (
        <div className="container">
            {/* get user */}
            <h3>Daftar User</h3>
            <table>
                <thead>
                <tr>
                    <th>No</th>
                    <th>Nama</th>
                    <th>Tanggal Pembuatan Akun</th>
                </tr>
                </thead>
               {
                // nomor increment
                     user.map((item) => {
                        return (
                            <tbody key={item._id}>
                            <tr>
                                <td>{no++}</td>
                                <td>{item.name}</td>
                                <td>
                                    {
                                        // convert datetime
                                        new Date(item.date).toLocaleDateString()
                                    }
                                </td>
                            </tr>
                            </tbody>
                        );
                    })
               }
            </table>
        </div>
    );
}

export default User;