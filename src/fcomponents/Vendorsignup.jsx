import React, { useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [udetails, setUdetails] = useState({
    firstname: '',
    email: '',
    password: '',
    phone: '',
    category: '',
    city: '',
    about: '',
    state: '',
    pricing: '',
    charge1:'',
    charge2:''
  });



  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

if(validateForm())
{

    try {

      const { data } = await axios.post('http://localhost:5000/auth/page1/createorganizer', udetails, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(data);

      if (data.success === false) {
        alert(data.error);
      }
      if (data.success) {
        localStorage.setItem('token', data.authToken);
        window.location = "/organizer";

        navigate('/organizer');
        console.log('Success');
      }
    } catch (error) {
      alert('Database is not connected...');
    }
}




  };





  const [errors, setErrors] = useState({});

  const validateForm = () => {
      const newErrors = {};

      if (udetails.firstname.trim() === "") {
          newErrors.firstname = "This field is required";
      }


      if (udetails.email.trim() === "") {
          newErrors.email = "This field is required";
      }

      if (udetails.phone.trim() === "") {
          newErrors.phone = "This field is required";
      } else if (udetails.phone.length !== 10) {
          newErrors.phone = "Please enter a valid 10-digit phone number";
      }


      let cp = document.getElementById("cpassword")
      if(udetails.password.trim() === "")
      {
          newErrors.password = "This field is required...."
      }
      else if(cp.value !== udetails.password)
      {
          newErrors.cpassword = "Incorrect Confirm Password"
      }



      if (udetails.about.trim() === "") {
        newErrors.about = "This field is required";
    } 


      

      setErrors(newErrors);

      // Return true if there are no errors
      return Object.keys(newErrors).length === 0;
  };






  
  const [Name, setName] = useState("")
  const [Phone, setPhone] = useState("")
  const [Password, setPassword] = useState("")
  const [Cpass, setCpass] = useState("")
  const [Category, setCategory] = useState("")
  const [State, setState] = useState("")
  const [City, setCity] = useState("")
  const [Price, setPrice] = useState("")
  const [Charge1, setCharge1] = useState("")
  const [Charge2, setCharge2] = useState("")








  const checkError = ()=>{
    let bname = document.getElementById('name')
    if(bname.value === '')
    {
      setName("This field is required....")
      setTimeout(() => {
        setName('')
      }, 4000);
    }


    let phone = document.getElementById('phone')
    if(!isValidPhoneNumber(phone.value))
    {
      setPhone("Please enter 10 digits")
      setTimeout(() => {
        setPhone('')
      }, 4000);
    }


    let password = document.getElementById("password")
    if(password.value === '')
    {
      setPassword("This field is required")
      setTimeout(() => {
        setPassword('')
      }, 4000);
    }


    let cpassword = document.getElementById("cpassword")
    if(password.value !== cpassword.value)
    {
        setCpass("Incorrect Confirm Password")
        setTimeout(() => {
          setCpass('')
        }, 4000);
    }
    else if(cpassword.value === '')
    {
      setCpass('This field is required')
      setTimeout(() => {
        setCpass('')
      }, 4000);
    }



    let category = document.getElementById("category")
    if(category.value === '')
    {
        setCategory("Please select Category")
        setTimeout(() => {
          setCategory('')
        }, 4000);
    }




    let state = document.getElementById("state")
    if(state.value === '')
    {
        setState("Please select State")
        setTimeout(() => {
          setState('')
        }, 4000);
    }


    let city = document.getElementById("city")
    if(city.value === '')
    {
        setCity("This field is required")
        setTimeout(() => {
          setCity('')
        }, 4000);
    }

    
    let pricing = document.getElementById("pricing")
    if(pricing.value === '')
    {
        setPrice("This field is required")
        setTimeout(() => {
          setPrice('')
        }, 4000);
    }



    let charge1 = document.getElementById("charge1")
    if(charge1.value === '')
    {
        setCharge1("This field is required")
        setTimeout(() => {
          setCharge1('')
        }, 4000);
    }

    let charge2 = document.getElementById("charge2")
    if(charge2.value === '')
    {
        setCharge2("This field is required")
        setTimeout(() => {
          setCharge2('')
        }, 4000);
    }

  }





  


      //On Change Handler
      const onChange = (e) => {
        const { name, value } = e.target;
        setUdetails({
            ...udetails,
            [name]: value
        });
    };





  // const isValidEmail = (email) => {
  //   const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  //   return emailRegex.test(email);
  // };

  const isValidPhoneNumber = (phone) => {
    const phoneRegex = /^[0-9]{10}$/; // Assuming a 10-digit phone number
    return phoneRegex.test(phone);
  };

  return (
    <>
      <Navbar />
      <section className="bg-image">
        <div className="mask d-flex align-items-center gradient-custom-3">
          <div className="container">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderRadius: '15px' }}>
                  <div className="card-body p-5" style={{ marginBottom: '10px' }}>
                    <h2 className="text-uppercase text-center mb-5">Grow your business with us</h2>

                    <form onSubmit={handleSubmit} id="my-form">
                      {/* ... Rest of the form elements ... */}
                      <div className="d-flex">
                        <div className="right-div mx-2">

                          <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="name"> Brand Name </label>
                            <input type="text" name="firstname" value={udetails.firstname} onChange={onChange} id="name" className="form-control form-control-lg" required/>
                            <span className='text-danger'>{errors.firstname || Name}</span>
                          </div>


                          {/* for email */}



                          <div class="form-outline mb-4">
                            <label class="form-label" for="password">Password</label>
                            <input type="password" name='password' value={udetails.password} onChange={onChange} id="password" class="form-control form-control-lg"  required/>
                            <span className='text-danger'>{Password}</span>

                          </div>



                          <div class="form-outline mb-4">
                            <label class="form-label" for="category">Select Business category</label>
                            <select className='form-control form-control-lg' onChange={onChange} name="category" id="category" required>
                              <option value="" disabled>Select</option>
                              <option value="">Select</option>


                              <option value="Photographer">Photographer</option>
                              <option value="Venue">Function Hall</option>
                              <option value="Mehandi">Mehandi</option>
                              <option value="Sound System">Sound System</option>
                              <option value="Catering">Catering</option>
                              <option value="Wedding Planner">Wedding Planner</option>
                            </select>
                            <span className='text-danger'>{Category}</span>

                          </div>


                          <div class="form-outline mb-4">
                            <label class="form-label" for="city">City</label>
                            <input type="text" name='city' value={udetails.city} onChange={onChange} id="city" class="form-control form-control-lg" required/>
                            <span className='text-danger'>{City}</span>

                          </div>

                    


                          {/* ... Other form elements ... */}





                        </div>

                        <div className="left-div mx-2">
                          <div className="form-outline mb-4">
                            <label className="form-label" htmlFor="phone">Mobile Number</label>
                            <input type="number" pattern='[6-9]{1}[0-9]{9}' title='Please enter a valid mobile number' name="phone" value={udetails.phone} onChange={onChange} id="phone" className="form-control form-control-lg"
                            required/>
                            <span className='text-danger'>{errors.phone || Phone}</span>
                          </div>

                          <div class="form-outline mb-4">
                            <label class="form-label" for="cpassword">Confirm Password</label>
                            <input type="password" name='cpassword' onChange={onChange} id="cpassword" class="form-control form-control-lg"  required/>
                            <span className='text-danger'>{errors.cpassword || Cpass}</span>


                            

                          </div>


                          <div class="form-outline mb-4">
                            <label class="form-label" for="state">Select State</label>
                            <select className='form-control form-control-lg' onChange={onChange} name="state" id="state" required>
                              <option value="" disabled>Select</option>
                              <option value="">Select</option>
                              <option value="Karnataka">Karnataka</option>
                              <option value="Maharashtra">Maharashtra</option>
                              <option value="Bihar">Bihar</option>
                              <option value="Goa">Goa</option>
                              <option value="Odisha">Odisha</option>
                              <option value="Uttar Pradesh">Madhya Pradesh</option>
                              <option value="Delhi">Delhi</option>
                              <option value="Kerala">Kerala</option>
                              <option value="Pondicheri">Pondicheri</option>
                              <option value="Bengol">Bengol</option>
                              <option value="Punjab">Punjab</option>
                              <option value="Hariyana">Hariyana</option>



                            </select>
                            <span className='text-danger'>{State}</span>



                          </div>

                          
                          <div class="form-outline mb-4">
                            <label class="form-label" for="email">Your Email</label>
                            <input type="email" name='email' value={udetails.email} onChange={onChange} id="email" class="form-control form-control-lg" required/>
                          <span className='text-danger'>{errors.email}</span>
                          </div>


                          {/* ... Other form elements ... */}





                        </div>
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="about">
                          Tell something about yourself...
                        </label>
                        <textarea className="form-control form-control-lg" name="about" value={udetails.about} id="about" cols="30"
                          rows="2" onChange={onChange} minLength={10}
                        ></textarea>
                        <span className='text-danger'>{errors.about}</span>
                      </div>


                                                
                      <div class="form-outline mb-4">
                            <label class="form-label" for="pricing">Average Pricing</label>
                            <input type="number" name='pricing' value={udetails.pricing} onChange={onChange} id="pricing" class="form-control form-control-lg" placeholder='In Rupees' required/>
                            <span className='text-danger'>{Price}</span>

                          </div>


                      <div class="form-outline mb-4">
                            <label class="form-label" for="charge1">Pricing Details</label>
                            <input type="number" name='charge1' value={udetails.charge1} onChange={onChange} id="charge1" class="form-control form-control-lg" placeholder='1 Day charges' required/>
                            <span className='text-danger'>{Charge1}</span>
                          </div>


                          <div class="form-outline mb-4">
                            <input type="number" name='charge2' value={udetails.charge2} onChange={onChange} id="charge2" class="form-control form-control-lg" placeholder='2 day charges' required/>
                            <span className='text-danger'>{Charge2}</span>

                          </div>



                      {/* ... Rest of the form elements ... */}

                      <div className="d-flex justify-content-center">
                        <input
                          type="submit"
                          className="btn btn-primary btn-lg"
                          value="Register"
                          onClick={checkError}
                        />
                      </div>

                      <p className="text-center text-muted mt-5 mb-0">
                        Have already an account?{' '}
                        <a href="/vendor" className="fw-bold text-body">
                          <u>Login here</u>
                        </a>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >
      </section >
    </>
  );
};

export default Signup;





