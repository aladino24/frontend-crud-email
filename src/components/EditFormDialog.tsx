import React, { useEffect } from "react";
import Swal from "sweetalert2";
import moment from "moment";
import axios from "axios";
import Config from "../config";

interface InitialData {
    _id: string;
    recipient: string;
    subject: string;
    description: string;
}

interface EditFormDialogProps {
    start: string; 
    initialData: InitialData;
    onEventAdded: (updatedEmail: any) => void;
    onCancel: () => void;
}

const EditFormDialog: React.FC<EditFormDialogProps> = ({ start, initialData, onEventAdded, onCancel }) => {
    const formattedDate = moment(start).format("YYYY-MM-DD");

    const handleOpen = async () => {
        const { value: formValues } = await Swal.fire({
            title: 'Edit Email',
            html: `  
            <div style="display: flex; flex-direction: column; gap: 10px; width: 500px;">
                <div style="display: flex; align-items: center;">
                    <label for="to" style="margin-right: 10px; width: 150px;">To:</label>
                    <input id="to" class="swal2-input" placeholder="Recipient Email" style="flex: 1;" value="${initialData.recipient || ''}">
                </div>
                <div style="display: flex; align-items: center;">
                    <label for="email" style="margin-right: 10px; width: 150px;">Subject:</label>
                    <input id="email" class="swal2-input" placeholder="Subject" style="flex: 1;" value="${initialData.subject || ''}">
                </div>
                <div style="display: flex; align-items: center;">
                    <label for="date" style="margin-right: 10px; width: 130px;">Date:</label>
                    <input id="date" type="date" class="swal2-input" value="${formattedDate}">
                </div>
                <div style="display: flex; flex-direction: column;">
                    <label for="description" style="margin-top: 10px;">Description:</label>
                    <textarea id="description" class="swal2-textarea" placeholder="Description" style="width: calc(100% - 40px); height: 150px; margin-left: 0;">${initialData.description || ''}</textarea> 
                </div>
            </div>
            `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonText: 'Save Changes',
            cancelButtonText: 'Cancel',
            preConfirm: () => {
                const email = (document.getElementById('email') as HTMLInputElement).value;
                const recipient = (document.getElementById('to') as HTMLInputElement).value;
                const date = (document.getElementById('date') as HTMLInputElement).value;
                const description = (document.getElementById('description') as HTMLTextAreaElement).value;

                if (!email || !date || !description || !recipient) {
                    Swal.showValidationMessage(`Please fill in all fields`);
                }
                return { email, recipient, date, description };
            }
        });

        if (formValues === undefined) {
            onCancel(); 
            return; 
        }

        if (formValues) {
            const token = localStorage.getItem("token");
            const sender = localStorage.getItem("email");

            try {
                const response = await axios.put(`${Config.api.server1}/api/edit-email`, {
                    id: initialData._id,
                    sender,
                    recipient: formValues.recipient,
                    subject: formValues.email,
                    date: new Date(formValues.date).toISOString(),
                    description: formValues.description
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                onEventAdded(response.data.updatedEmail);
                Swal.fire('Email updated!', 'Your email has been updated successfully.', 'success');
            } catch (error) {
                console.error(error);
                Swal.fire('Error!', 'There was an error updating the email.', 'error');
            }
        }
    };

    useEffect(() => {
        handleOpen();
    }, []);

    return null;
};

export default EditFormDialog;
