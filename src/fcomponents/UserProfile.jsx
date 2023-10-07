import React, {useState, useEffect} from 'react';
import Sendmail from './Sendmail';
import axios from 'axios';

const UserProfile = ({ user }) => {


  const [myuser, setMyUser] = useState({name:"", email:""});

  useEffect(() => {
      getUser();
  }, []);

  async function getUser() {
      try {
          const response = await axios.get('http://localhost:5000/auth/getuser', {
              headers: {
                  "auth-token":  localStorage.getItem('token')
              }
          });
          
          setMyUser({
              name: response.data.name,
              email: response.data.email
          });
          console.log(response)
      } catch (error) {
          console.error(error);
      }
  }


  return (
    <>
    <div className='d-flex'>
      <div className='mx-2'>
        <img src={`http://localhost:5000/${user.image}`} alt="User" />
      </div>
      <div>
        <h3 style={{margin:"0", marginBottom:"2px", fontSize:"25px"}}><b>{user.firstname}</b></h3>
        <p style={{color:"blue" ,margin:"0", marginBottom:"2px"}}>{user.city}</p>
        <p style={{color:"blue" ,margin:"0", marginBottom:"2px"}}>{user.state}</p>

        <p style={{margin:"0", marginBottom:"2px"}}>₹ <b style={{color:"red"}}>{user.pricing}</b> onwards</p>
        <p style={{margin:"0", marginBottom:"2px"}}><b style={{color:"violet"}}>{user.category}</b></p>
        {/* <p style={{margin:"0", marginBottom:"2px"}}>+91 <b style={{color:"orange"}}>{user.phone}</b></p>
        <p style={{margin:"0", marginBottom:"2px", fontSize:"13px"}}><b style={{color:"orange"}}>{user.email}</b></p> */}
      

      </div>
    </div>
    <div className="desc my-2 px-2">
      <h3 style={{margin:"0", marginBottom:"2px", fontWeight:"400", fontSize:"23px"}} className='my-2'><b>About Vendor</b></h3>
    <p style={{margin:"0", marginBottom:"2px"}}>{user.about}</p>
    <h3 style={{margin:"0", marginBottom:"2px", fontWeight:"400", fontSize:"23px"}} className='my-2'><b>Pricing Details</b></h3>
    <p style={{margin:"0", marginBottom:"2px"}}>1 Day Charges:  ₹ <b className='text-danger'>{user.charge1}</b></p>
    <p style={{margin:"0", marginBottom:"2px"}}>2 Day Charges:  ₹ <b className='text-danger'>{user.charge2}</b></p>

    <h3 style={{margin:"0", marginBottom:"2px", fontWeight:"400", fontSize:"23px"}} className='my-2'><b>Send Message</b></h3>


        
    </div>


      <Sendmail email={user.email} name = {myuser.name} customer={myuser.email} />
 </>

  );
};

export default UserProfile;
