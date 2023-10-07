import React from 'react'
import './Dash.css'
import { useNavigate } from 'react-router-dom';
import myuser from './img/myuser.png'


const Dashnav = (props) => {


    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");

        navigate("/");
        window.location.reload();
    };



    return (
        <>


            <nav id="main-navbar" class="navbar navbar-expand-lg navbar-light bg-white fixed-top">
                <div class="container-fluid">
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-mdb-toggle="collapse"
                        data-mdb-target="#sidebarMenu"
                        aria-controls="sidebarMenu"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <i class="fas fa-bars"></i>
                    </button>

                    <a class="navbar-brand" href="/admindash">
                        <h3>Moment Makers Admin</h3>
                    </a>



                    <ul class="navbar-nav ms-auto d-flex flex-row">


                        <li class="nav-item dropdown mx-5 px-4">
                            <a
                                class="nav-link dropdown-toggle hidden-arrow d-flex align-items-center"
                                href="/organizer"
                                id="navbarDropdownMenuLink"
                                role="button"
                                data-mdb-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <img
                                    src={myuser}
                                    class="rounded-circle"
                                    height="30"
                                    alt="Avatar"
                                    loading="lazy"
                                />
                            </a>
                            <ul
                                class="dropdown-menu dropdown-menu-start"
                                aria-labelledby="navbarDropdownMenuLink"
                            >
                                <li>
                                    <li class="dropdown-item"  onClick={handleLogout}>Logout</li>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>


        </>
    )
}

export default Dashnav