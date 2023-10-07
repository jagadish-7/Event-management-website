import {React, useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    
    const [creds, setCreds] = useState({ email: "", password: "" })

    const navigate = useNavigate();



    // axios post request
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {


            const { data } = await axios.post('http://localhost:5000/auth/login',
                document.querySelector('#my-form'), {
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            console.log(data);
            if(data.success === false)
            {
                alert("Please check your credentials...")
            }
            if (data.success) {
                localStorage.setItem('token', data.authToken);
                window.location = "/userdash";
                // props.showAlert("Successfully Logged In", "Success");
                navigate("/userdash");
                console.log("Success");
            }
            


        }

        catch (error) {

            alert("Database is not connected...");
        }


    }



   



    const onChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value })
    }



    return (
        <>

            <Navbar />
            <div className="container my-5">
                <h1 className="my-2" style={{paddingBottom:"20px"}}>User Login</h1>
            <form onSubmit={handleSubmit} id='my-form'>
                <div class="form-outline mb-4 form-group">
                    <input type="email" id="form2Example1" name='email' value={creds.email} onChange={onChange} class="form-control" required/>
                    <label class="form-label" for="form2Example1">Email address</label>
                </div>

                <div class="form-outline mb-4">
                    <input type="password" name='password' value={creds.password} onChange={onChange} id="form2Example2" class="form-control" required/>
                    <label class="form-label" for="form2Example2">Password</label>
                </div>

                <div class="row mb-4">
                    <div class="col">
                        <a href="/forget-password">Forgot password?</a>
                    </div>
                </div>

                <input type="submit" class="btn btn-primary btn-block mb-4" value="Sign in"/>

                <div class="text-center">
                    <p>Not a member? <a href="/signup">Register</a></p>
                    
                </div>
            </form>

            </div>


            <Footer />



        </>
    )
}

export default Login