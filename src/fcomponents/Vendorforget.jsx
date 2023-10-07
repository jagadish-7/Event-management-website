import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useRef } from 'react'
import Reset from './Reset'



const Vendorforget = () => {
    const [creds, setCreds] = useState({ email: "" })
    const [msg, setMsg] = useState("")
    const [myform, setForm] = useState(false)

    const navigate = useNavigate();

    let use = useRef();


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {


            const { data } = await axios.post('http://localhost:5000/auth/vendor-email-send',
                document.querySelector('#my-form'), {
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            console.log(data);

            if (data.success) {

                setForm(true)
                setMsg("Email send successfully");

                setTimeout(() => {


                    // window.location = "/reset-password";
                    // // props.showAlert("Successfully Logged In", "Success");
                    // navigate("/reset-password");
                    console.log("Success");
                }, 2000);
            }
            else{
              setMsg(data.error)
              setTimeout(() => {
                setMsg("")
              }, 4000);
            }
            
            

        }

        catch (error) {

            setMsg("Internal Server Error, Please restart your server")
        }


    }




    const onChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value })
    }

    return (
        <>

        {!myform
        ?
       
        <section class="vh-100 bg-image">
        <div class="mask d-flex align-items-center h-100 gradient-custom-3">
          <div class="container h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
              <div class="col-12 col-md-9 col-lg-7 col-xl-6">
                <div class="card" style={{borderRadius: "15px"}}>
                  <div class="card-body p-5">
                    <h2 class="text-uppercase text-center mb-5">Forget Password</h2>

                    <form onSubmit={handleSubmit} id='my-form'>

                      <div class="form-outline mb-4">
                        <input type="email" placeholder='Enter your email here...' id="form3Example1cg" class="form-control form-control-lg text-center" name='email' value={creds.email} onChange={onChange} required />
                      </div>
                      <div className='text-center my-2' style={{paddingBottom:"8px"}}>{msg}</div>

                      <div class="d-flex justify-content-center">
                        
                      <input type="submit" className='btn btn-primary mx-2' value="Send OTP" />
                      <a type="button" href='/login'
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

        
        
        
        
        : 





        
        <Reset email={creds.email}/>
}



        </>
    )
}

export default Vendorforget