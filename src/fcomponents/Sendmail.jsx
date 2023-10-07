import React, {useState} from 'react'
import axios from 'axios';

const Sendmail = (props) => {

    

    
    const {email, name, customer} = props;
    console.log(name)
    console.log(customer)
    const [msg, setMsg] = useState("");
    const [udetails, setUdetails] = useState({ subject:"", date:"", phone:""});

    const onChange = (e) => {
        setUdetails({ ...udetails, [e.target.name]: e.target.value })
    }



    const handleSubmit = async (e) => {
        e.preventDefault();

        
          try {
            const response = await axios.post('http://localhost:5000/auth/sendmail', {
                to:email,
                subject:udetails.subject,
                senderEmail: customer,
                senderName:name,
                senderDate:udetails.date,
                senderNumber:udetails.phone
            });
      
            console.log(response.data);
            setMsg("Message sent successfully!");
            setTimeout(() => {
              setMsg("")
            }, 4000);
          } catch (error) {
            console.error(error);
            
            setMsg(error);
          }
            

    }





    


  return (
    <>


<div className="send-email row mx-2">
      <textarea name="subject" value={udetails.subject} onChange={onChange} placeholder='Hii, I want to contact you...'  id="desc" cols="20" rows="4"></textarea>
      <input type="number" placeholder='Enter your mobile number' className='my-2 form-input' onChange={onChange} value={udetails.phone} name='phone' required/>
      
    <input type="date" className='my-2 form-input' min='2023-09-07' max='2023-12-07' onChange={onChange} value={udetails.date} name='date' required/>
    </div>
      <button className='btn btn-sm btn-danger my-2 mx-2' onClick={handleSubmit}>Send Message</button>
      {msg}
    
    
    </>
  )
}

export default Sendmail