import React, { useState, useEffect } from 'react'
import Dashnav from './Dashnav'
import Dashside from './Dashside'
import axios from 'axios'
const AdminVendorProfiles = () => {


    const [organizers, setOrganizers] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/auth/organizers')
            .then(response => {
                setOrganizers(response.data);
            })
            .catch(error => {
                console.error('Error fetching organizers:', error);
            });
    }, []);


    
    const deleteUser = (userId) => {
        // Make a DELETE request to your backend to delete the user by ID
        axios.delete(`http://localhost:5000/auth/deleteorganizer/${userId}`)
          .then((response) => {
            // Handle the deletion success (e.g., remove the user from the list)
            const updatedUsers = organizers.filter((user) => user._id !== userId);
            alert('Organizer Removed Successfully')
            setOrganizers(updatedUsers);
          })
          .catch((error) => {
            console.error('Error deleting user:', error);
          });
      };





    return (
        <>

            <header>
                <Dashnav />
                <Dashside />
            </header>
            <main style={{ marginTop: "55px" }}>
            <div className="container pt-4">
                    <h3 className='my-2'>All Vendors</h3>
                </div>
                <div class="container pt-1">

                    <div className="row my-3">
                        {organizers.map(organizer => (
                            <div key={organizer._id} className="col my-2">
                                <div className="card " style={{ width: "12rem" }}>
                                    <img class="card-img-top" src={`http://localhost:5000/${organizer.image}`} alt="Card cap" />
                                    <div class="card-body" >
                                        <h5 class="card-title" style={{ fontWeight: "700" }}>{organizer.firstname}</h5>

                                        <p style={{ color: "blue", margin: "0", marginBottom: "2px" }}>{organizer.state} - {organizer.city}</p>

                                        <p style={{ margin: "0", marginBottom: "2px" }}>₹ <b style={{ color: "red" }}>{organizer.pricing}</b></p>
                                        <p style={{ margin: "0", marginBottom: "5px" }}><b style={{ color: "brown" }}>{organizer.category}</b></p>

                                        <p style={{ margin: "0", marginBottom: "5px" }}><b>{organizer.phone}</b></p>

                                        <p style={{ margin: "0", marginBottom: "5px" }}><b style={{ color: "blue" }}>{organizer.email}</b></p>

                                        <button onClick={() => deleteUser(organizer._id)} 
                      className="btn btn-sm btn-danger">Delete</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>




                </div>
            </main>



        </>
    )
}

export default AdminVendorProfiles