import React from 'react'
import { Link } from 'react-router-dom'




const Navbar = () => {
  const user = localStorage.getItem('token');
  console.log(user)
  return (
    <>

  <header id="header" class="d-flex align-items-center">
    <div class="container d-flex justify-content-between">

      <div id="logo">
        {!user?<h1 style={{fontSize:"35px"}}><Link to="/">Moment<span>Makers</span></Link></h1>:
        <h1 style={{fontSize:"35px"}}><Link to="/userdash">Moment<span>Makers</span></Link></h1>
        }
      </div>

      <nav id="navbar" class="navbar">
        <ul>
          {!user?<li><Link class="nav-link scrollto active" to="/">Home</Link></li>:
          <li><Link class="nav-link scrollto active" to="/userdash">Home</Link></li>
          }
          <li><Link class="nav-link scrollto active" to="/services">Our Services</Link></li>

         {!user? <li class="dropdown"><a href="/login"><span>Login</span> <i class="bi bi-chevron-down"></i></a>
            <ul>
              <li><Link to="/login">User</Link></li>

              <li><Link to="/vendor">Vendor</Link></li>
              <li><Link to="/admin">Admin</Link></li>
            </ul>
          </li>:
            <li><Link class="nav-link sxcrollto active" to="/my-profile">My Profile</Link></li>
          
          

          
          }
        </ul>
        <i class="bi bi-list mobile-nav-toggle"></i>
      </nav>

    </div>
  </header>
    
    
    </>
  )
}

export default Navbar