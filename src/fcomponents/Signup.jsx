import React, { useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [udetails, setUdetails] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({ name: '', email: '', password: '' });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Validate the form fields before making the request
      const validationErrors = validateForm(udetails);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      // If validation passes, make the Axios request
      const { data } = await axios.post('http://localhost:5000/auth/page1/createuser', udetails, {
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
        window.location = "/userdash"        
        navigate('/userdash');
        console.log('Success');
      }
    } catch (error) {
      alert('Database is not connected...');
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setUdetails({ ...udetails, [name]: value });

    // Clear the validation error for the current field
    setErrors({ ...errors, [name]: '' });
  };

  // Validation function for the form fields
  const validateForm = (values) => {
    const errors = {};

    if (!values.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!values.email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(values.email)) {
      errors.email = 'Invalid email format';
    }

    if (!values.password.trim()) {
      errors.password = 'Password is required';
    } else if (values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    return errors;
  };

  // Validation function for email format
  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
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
                    <h2 className="text-uppercase text-center mb-5">Create an account</h2>

                    <form onSubmit={handleSubmit} id="my-form">
                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="name">Your Name</label>
                        <input
                          type="text"
                          name="name"
                          value={udetails.name}
                          onChange={onChange}
                          id="name"
                          className="form-control form-control-lg"
                        />
                        {errors.name && <p className="text-danger">{errors.name}</p>}
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="email">
                          Your Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={udetails.email}
                          onChange={onChange}
                          id="email"
                          className="form-control form-control-lg"
                        />
                        {errors.email && <p className="text-danger">{errors.email}</p>}
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          value={udetails.password}
                          onChange={onChange}
                          id="password"
                          className="form-control form-control-lg"
                        />
                        {errors.password && <p className="text-danger">{errors.password}</p>}
                      </div>

                      <div className="d-flex justify-content-center">
                        <input
                          type="submit"
                          className="btn btn-primary btn-lg"
                          value="Register"
                        />
                      </div>

                      <p className="text-center text-muted mt-5 mb-0">
                        Have already an account?{' '}
                        <a href="/login" className="fw-bold text-body">
                          <u>Login here</u>
                        </a>
                      </p>

                      <p className="text-center text-muted mt-5 mb-0">
                        Are you a vendor??{' '}
                        <a href="/vendorsignup" className="fw-bold text-body">
                          <u>Business Sign Up</u>
                        </a>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
