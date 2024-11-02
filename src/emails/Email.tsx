import React, { useEffect, useState } from "react";
import axios from "axios";
import './Email.css';
import { useNavigate } from "react-router-dom";
import EditFormDialog from "../components/EditFormDialog";
import Swal from "sweetalert2"; 
import Config from "../config";

interface EmailData {
    _id: string;
    sender: string;
    recipient: string;
    date: string; 
    subject: string;
    description: string;
}

const Email: React.FC = () => {
    const [emailData, setEmailData] = useState<EmailData[]>([]);
    const [selectedEmail, setSelectedEmail] = useState<EmailData | null>(null); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmails = async () => {
            const token = localStorage.getItem("token");
            const email = localStorage.getItem("email");

            try {
                const response = await axios.post(
                    `${Config.api.server1}/api/get-email`,
                    { email },
                    {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json"
                        }
                    }
                );

                setEmailData(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                        localStorage.removeItem("token");
                        localStorage.removeItem("email");
                        navigate("/", { replace: true });
                    } else {
                        console.error("Error fetching email data:", error);
                    }
                } else {
                    console.error("An unexpected error occurred:", error);
                }
                setEmailData([]);
            }
        };

        fetchEmails();
    }, [navigate]); 

    const handleEdit = (email: EmailData) => {
        setSelectedEmail(email); 
    };

    const handleDelete = (id: string) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Apakah yakin akan hapus email ini!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const token = localStorage.getItem("token");
                    await axios.delete(`${Config.api.server1}/api/delete-email/${id}`, {
                        headers: {
                            "Authorization": `Bearer ${token}`
                        }
                    });

                    setEmailData((prevData) => prevData.filter(email => email._id !== id));
                    Swal.fire(
                        'Deleted!',
                        'Your email has been deleted.',
                        'success'
                    );
                } catch (error) {
                    console.error("Error deleting email:", error);
                    Swal.fire(
                        'Error!',
                        'There was an error deleting the email.',
                        'error'
                    );
                }
            }
        });
    };

    const handleEventAdded = (updatedEmail: EmailData) => {
        setEmailData((prevData) =>
            prevData.map((email) => (email._id === updatedEmail._id ? updatedEmail : email))
        );
        setSelectedEmail(null); 
    };

    const handleCancel = () => {
        setSelectedEmail(null); 
    };

    return (
        <div className="email">
            <h2>Email List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Sender</th>
                        <th>Recipient</th>
                        <th>Date</th>
                        <th>Subject</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {emailData.map((email) => (
                        <tr key={email._id}>
                            <td>{email.sender}</td>
                            <td>{email.recipient}</td>
                            <td>{new Date(email.date).toLocaleDateString()}</td>
                            <td>{email.subject}</td>
                            <td>{email.description}</td>
                            <td className="action-column">
                                <button onClick={() => handleEdit(email)} className="action-button edit-button">
                                    Edit
                                </button>
                                <button onClick={() => handleDelete(email._id)} className="action-button delete-button">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedEmail && (
                <EditFormDialog
                    start={selectedEmail.date}
                    initialData={selectedEmail}
                    onEventAdded={handleEventAdded}
                    onCancel={handleCancel} 
                />
            )}
        </div>
    );
};

export default Email;
