import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../fcomponents/Navbar';
import Footer from '../fcomponents/Footer';
import { useNavigate } from 'react-router-dom';

const MyUserProfile = () => {

    const navigate = useNavigate()
      
    const handleLogout = () => {
          localStorage.removeItem("token");
      
      navigate("/");
          window.location.reload();
      };


    const [myuser, setMyUser] = useState({ name: "", email: "" , id:"", createAt:""});

    useEffect(() => {
        getUser();
    }, []);

    async function getUser() {
        try {
            const response = await axios.get('http://localhost:5000/auth/getuser', {
                headers: {
                    "auth-token": localStorage.getItem('token')
                }
            });

            setMyUser({
                name: response.data.name,
                email: response.data.email,
                createAt:response.data.date,
                id:response.data._id
            });
            console.log(response)
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <>

            <Navbar />
            <div className="vh-100">
                <h1 className='text-center my-5'>My Profile</h1>

                <div className="container d-flex">
                    <div className="left">
                        <p><b>User Id:</b> {myuser.id}</p>
                        <p><b>User Name:</b> {myuser.name}</p>
                        <p><b>Email:</b> {myuser.email}</p>
                        <p><b>Account Created At: </b> {myuser.createAt}</p>

                    </div>
                </div>

                <div className="container">
                    <button className='btn btn-sm btn-danger' onClick={handleLogout}>Logout</button>
                </div>
            </div>

            <Footer />



        </>
    )
}

export default MyUserProfile