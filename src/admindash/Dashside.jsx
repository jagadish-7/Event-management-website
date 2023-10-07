import React from 'react'
import './Dash.css'
import { Link } from 'react-router-dom'

const Dashside = () => {
    return (
        <>

            <nav id="sidebarMenu" class="collapse d-lg-block sidebar collapse bg-white">
                <div class="position-sticky">
                    <div class="list-group list-group-flush mx-3 mt-4">
                        <Link to="/admindash" class="list-group-item list-group-item-action py-2 ripple active"
                        ><i class="fas fa-lock fa-fw me-3"></i><span>My profile</span></Link>

                        <Link to="/all-signed-users" class="list-group-item list-group-item-action py-2 ripple"
                        ><i class="fas fa-lock fa-fw me-3"></i><span>Users</span></Link>
                        <Link to="/all-signed-vendors" class="list-group-item list-group-item-action py-2 ripple"
                        ><i class="fas fa-lock fa-fw me-3"></i><span>Vendors</span></Link>

                    </div>
                </div>
            </nav>



        </>
    )
}

export default Dashside