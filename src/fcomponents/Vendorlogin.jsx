import React, {useState} from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Vendorlogin = () => {

    const [creds, setCreds] = useState({ email: "", password: "" })

    const navigate = useNavigate();



    // axios post request
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {


            const { data } = await axios.post('http://localhost:5000/auth/vendorlogin',
                document.querySelector('#my-form'), {
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            console.log(data);

            if (data.success) {
                localStorage.setItem('token', data.authToken);
                window.location = "/organizer";
                // props.showAlert("Successfully Logged In", "Success");
                console.log("Success");
                navigate("/organizer");
            }
            else{
                alert("Please check your credintials...")
            }


        }

        catch (error) {

            alert("Database is not connected....");
        }


    }



   



    const onChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value })
    }



  return (
    <>
    

    <Navbar/>
    <div className="container my-5">
    <h1 className="my-2" style={{paddingBottom:"20px"}}>Vendor Login</h1>

            <form onSubmit={handleSubmit} id="my-form">
                <div class="form-outline mb-4 form-group">
                    <input type="email" name='email' value={creds.email} onChange={onChange} id="form2Example1" class="form-control" />
                    <label class="form-label" for="form2Example1">Email address</label>
                </div>

                <div class="form-outline mb-4">
                    <input type="password" name='password' value={creds.password} onChange={onChange} id="form2Example2" class="form-control" />
                    <label class="form-label" for="form2Example2">Password</label>
                </div>

                <div class="row mb-4">
                    <div class="col">
                        <a href="/vendor-forget-password">Forgot password?</a>
                    </div>
                </div>

                <button type="submit" class="btn btn-primary btn-block mb-4">Sign in</button>

                <div class="text-center">
                    <p>Not a member? <a href="/vendorsignup">Register</a></p>
                    
                </div>
            </form>

            </div>
    <Footer/>
    
    
    </>
  )
}

export default Vendorlogin