import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'




const Reset = (props) => {
    const [creds, setCreds] = useState({ otp: "", password: "" })
    const [msg, setMsg] = useState("")
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {


            const { data } = await axios.post('http://localhost:5000/auth/vendor-otp-verify',
                {
                    email: props.email,
                    password: creds.password,
                    otp: creds.otp
                }
                , {
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })

            console.log(data);

            if (data.success) {


                setMsg("OTP verified, Changing your password");

                setTimeout(() => {

                    setMsg("Password Changed Successfully");

                    window.location = "/vendorlogin";
                    navigate("/vendorlogin");
                    console.log("Success");
                }, 2000);
            }



        }

        catch (error) {

            setMsg("Incorrect OTP, Please Enter valid OTP")
        }


    }




    const onChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value })
    }


    return (
        <>

            {/* <div className="container login-container my-5">
                <div className="wrapper">
                    <div className="title">
                        Enter OTP
                    </div>
                    <form onSubmit={handleSubmit} id='my-form'>
                        <div className="send-otp">
                            <label>OTP</label>
                            <input type="number" name='otp' value={creds.otp} onChange={onChange} required />
                        </div>
                        <div className="send-otp">
                            <label>New Password</label>
                            <input type="password" name='password' value={creds.password} onChange={onChange} required />
                        </div>
                        <div>{msg}</div>
                        <div className="field">
                            <input type="submit" value="Change Password" />
                        </div>
                    </form>
                </div>
            </div> */}



            <section class="vh-100 bg-image">
                <div class="mask d-flex align-items-center h-100 gradient-custom-3">
                    <div class="container h-100">
                        <div class="row d-flex justify-content-center align-items-center h-100">
                            <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                                <div class="card" style={{ borderRadius: "15px" }}>
                                    <div class="card-body p-5">
                                        <h2 class="text-uppercase text-center mb-5">Forget Password</h2>

                                        <form onSubmit={handleSubmit} id='my-form'>

                                            <div class="form-outline mb-4">
                                                <input type="number" placeholder='Enter OTP' id="form3Example1cg" class="form-control form-control-lg text-center" name='otp' value={creds.otp} onChange={onChange} required />
                                            </div>
                                            <div class="form-outline mb-4">
                                                <input type="email" placeholder='New Password' id="form3Example1cg" class="form-control form-control-lg text-center" name='password' value={creds.password} onChange={onChange} required />
                                            </div>



                                            <div className='text-center my-2' style={{ paddingBottom: "8px" }}>{msg}</div>

                                            <div class="d-flex justify-content-center">

                                                <input type="submit" className='btn btn-primary mx-2' value="Change Password" />
                                                <a type="button" href='/vendorlogin'
                                                    class="btn btn-danger btn-block">Back</a>
                                            </div>

                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default Reset