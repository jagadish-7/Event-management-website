import React, { useState, useEffect } from 'react'
import Dashnav from './Dashnav'
import Dashside from './Dashside'
import axios from 'axios'


const AdminUserProfiles = () => {

    const [myuser, setMyUser] = useState([])

    useEffect(() => {
        axios.get('http://localhost:5000/auth/getusers')
            .then(response => {
                setMyUser(response.data);
            })
            .catch(error => {
                console.error('Error fetching organizers:', error);
            });
    }, []);


    const deleteUser = (userId) => {
        // Make a DELETE request to your backend to delete the user by ID
        axios
          .delete(`http://localhost:5000/auth/deleteuser/${userId}`)
          .then((response) => {
            // Handle the deletion success (e.g., remove the user from the list)
            const updatedUsers = myuser.filter((user) => user._id !== userId);
            alert('User Removed Successfully')
            setMyUser(updatedUsers);
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
            <main style={{marginTop:"55px"}}>
                <div className="container pt-4">
                    <h3 className='my-2'>All Users</h3>
                </div>
                <div class="container pt-1">

                <div className="row my-3">
                        {myuser.map(organizer => (
                            <div key={organizer._id} className="col my-2">
                                <div className="card " style={{ width: "12rem" }}>
                                  
                                    <div class="card-body" >
                                        <p style={{ color: "blue", margin: "0", marginBottom: "2px" , color:"red"}}>{organizer.name}</p>
                                        <p style={{ margin: "0", marginBottom: "2px" }}><b style={{ color: "blue" }}>{organizer.email}</b></p>
                                        <p style={{ margin: "0", marginBottom: "5px" }}><b style={{ color: "brown" }}>{organizer.date}</b></p>

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

export default AdminUserProfiles