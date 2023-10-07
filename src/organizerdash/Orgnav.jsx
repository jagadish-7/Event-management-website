import React from 'react'
import { Link } from 'react-router-dom'




const Orgnav = () => {
  const user = localStorage.getItem('token');
  console.log(user)
  return (
    <>

  <header id="header" class="d-flex align-items-center">
    <div class="container d-flex justify-content-between">

      <div id="logo">
        <h1><Link to="/organizer">Moment<span>Makers</span></Link></h1>
      </div>

      <nav id="navbar" class="navbar">
        <ul>
          <li><Link class="nav-link scrollto active" to="/organizer">Home</Link></li>
          <li><Link class="nav-link scrollto active" to="/vendorservices">See Other Organizers</Link></li>

        
            <li><Link class="nav-link sxcrollto active" to="/my-vendor-profile">My Vendor Profile</Link></li>
          
          

          
          
        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav>

    </div>
  </header>
    
    
    </>
  )
}

export default Orgnav