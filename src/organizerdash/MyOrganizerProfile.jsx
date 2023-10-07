import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Orgnav from './Orgnav';

import { useNavigate } from 'react-router-dom';

const MyOrganizerProfile = () => {
    const navigate = useNavigate()
      
    const handleLogout = () => {
          localStorage.removeItem("token");
            localStorage.removeItem('isUpload')
      navigate("/");
          window.location.reload();
      };
    const [user, setUser] = useState({ firstname: "", lastname: "", dob: "", gender: "", createdAt: "", about: "", email: "", phone: "", id: "", image: "" });

    useEffect(() => {
        getOrganizer();
    }, []);

    async function getOrganizer() {
        try {
            const response = await axios.get('http://localhost:5000/auth/getorganizer', {
                headers: {
                    "auth-token": localStorage.getItem('token')
                }
            });
            setUser({
                firstname: response.data.firstname,
                lastname: response.data.lastname,
                email: response.data.email,
                phone: response.data.phone,
                dob: response.data.dob,
                gender: response.data.gender,
                createdAt: response.data.date,
                id: response.data._id,
                about: response.data.about,
                image: response.data.image
            });
            console.log(response)
        } catch (error) {
            console.error(error);
            // You might want to display an error message to the user in the UI.
        }
    }



    //for uploading image
    const [selectedImage, setSelectedImage] = useState(null);
    const handleImageChange = (event) => {
        setSelectedImage(event.target.files[0]);
    };

  

    const handleImageUpload = async () => {
        if (!selectedImage) return;
        const formData = new FormData();
        formData.append('image', selectedImage);

        try {
            const response = await axios.post('http://localhost:5000/auth/uploadimage', formData, {
                headers: {
                    "auth-token": localStorage.getItem('token'),
                    "Content-Type": "multipart/form-data",
                },
            });
            if (response.data.success) {
                alert(response.data.message)
                localStorage.setItem('isUpload', 'true')
                window.location.reload()
            }
            console.log(response.data); // Log the server's response
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
            <Orgnav />
            <div className="container my-4 ">
                <h1><b>My Vendor Profile</b></h1>
            </div>

            <div className="d-flex container" style={{ marginLeft: "220px" }}>
                <div className="user-image">
                    <div className="container">
                        <h3 style={{ fontSize: "26px" }}>Upload profile Image</h3>
                        <img src={`http://localhost:5000/${user.image}`} style={{ width: "230px" }} alt="Organizer" />
                        <input className='btn btn-sm my-2 btn-warning' type="file" accept="image/*" onChange={handleImageChange} />


                        <button className='btn btn-sm btn-primary' onClick={handleImageUpload}>
                            {localStorage.getItem('isUpload') === 'true' ? 'Update Image' : 'Upload Image'}
                        </button>









                    </div>


                </div>

                <div className="container">
                    <p><b>Unique ID:</b> {user.id}</p>
                    <p> <b>Name:</b> {user.firstname} {user.lastname}</p>
                    <p><b>Email: </b> {user.email}</p>
                    <p><b>Mobile Number</b> {user.phone}</p>
                    <p><b>About Me: </b>{user.about}</p>
                    <p><b>Account Created Date: </b>{user.createdAt}</p>
                    <button className='btn btn-sm btn-danger' onClick={handleLogout}>Logout</button>



                </div>


            </div>





        </>
    );
}

export default MyOrganizerProfile;
