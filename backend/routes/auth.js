
//Imported packages

const express = require('express');

//For hashing the password to secure it
const bcrypt = require('bcryptjs');

//Imported schema of the user
const User = require("../models/User");
const Otp = require("../models/Otp")
const Admin = require('../models/Admin')
const Organizer = require('../models/Organizer')


const fetchuser = require('../middleware/fetchuser')
const fetchorganizer = require('../middleware/fetchorganizer')

// nodemail
const nodemailer = require('nodemailer')








var jwt = require('jsonwebtoken'); //JWT included for security


//Express validator
const { body, validationResult } = require('express-validator');


// const fetchuser = require("../midleware/fetchUser");



//***************JSON WEB TOKEN SECRET KEY **************/

const JWT_SECRET = "thisISveryImportant@forSecurity";







//FOR image uploading
const multer = require('multer');
const path = require('path');



//For routing
const router = express.Router();







//FOR setting the directory where our images will be stored.....
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Specify the directory where images will be stored
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage });



  router.post('/uploadimage', fetchorganizer, upload.single('image'), async (req, res) => {
    try {
      // Update the organizer's profile with the image URL or other relevant data
      const userId = req.user.id;
      const imageUrl = req.file.path; // This will be the path to the uploaded image
      console.log(req.file)
      let success = false;
  
      // Update the Organizer model with the imageUrl
      await Organizer.findByIdAndUpdate(userId, { $set: { image: imageUrl } });
      success = true
      res.json({success,  message: 'Image uploaded successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });







//**** For creating user /auth/createUser        ---- No LOGIN REQUIRED  ----- */

router.post('/page1/createuser', [

    body('name', "Enter a valid name").isLength({ min: 3 }),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Enter valid password").isLength({ min: 5 })


],


    async (req, res) => {
        //console.log(req.body);

        //********************** */ For storing data into mongo database without validation
        // const user = User(req.body);
        // user.save();

        let success = false;



        try {


            //*********Express validation */
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success, errors: errors.array() });
            }

            let user = await User.findOne({ email: req.body.email });
            if (user) {
                success= false
                return res.json({ success, error: "Sorry, a user with this email already exists..." });
            }





            //Hashing the password to secure it using bcryptJS
            const salt = await bcrypt.genSaltSync(10);
            const secPassword = await bcrypt.hash(req.body.password, salt);


            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPassword,
            })



            const data = {
                user: {
                    id: user.id
                }
            }

            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            console.log({ success, authToken });
            res.json({ success, authToken });



            //res.json({success: "User created successfully"});


        }


        catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }


    })



// **************************************************************************************
//ROUTE FOR CREATING AN ORGANIZER
router.post('/page1/createorganizer', [

    body('firstname', "Enter a valid name").isLength({ min: 3 }),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Enter valid password").isLength({ min: 5 })


],


    async (req, res) => {

        let success = false;
        try {
            //*********Express validation */
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success, errors: errors.array() });
            }
            let user = await Organizer.findOne({ email: req.body.email });
            if (user) {
                success= false
                return res.json({ success, error: "Sorry, a user with this email already exists..." });
            }
            let phnumber = await Organizer.findOne({ phone: req.body.phone });
            if (phnumber) {
                success= false
                return res.json({ success, error: "Sorry, the mobile number is already in use..." });
            }

            //Hashing the password to secure it using bcryptJS
            const salt = await bcrypt.genSaltSync(10);
            const secPassword = await bcrypt.hash(req.body.password, salt);
            user = await Organizer.create({
                firstname: req.body.firstname,
                email: req.body.email,
                phone:req.body.phone,
                category:req.body.category,
                pricing:req.body.pricing,
                state:req.body.state,
                about:req.body.about,
                city:req.body.city,
                charge1:req.body.charge1,
                charge2:req.body.charge2,
                password: secPassword,
            })
            const data = {
                user: {
                    id: user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            console.log({ success, authToken });
            res.json({ success, authToken });
        }
        catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }


    })










// --------------------------------------------------------------------------------------









// ----------------------------------------------------------------------------------------




//**** For creating organizer /auth/createorganizer        ---- No LOGIN REQUIRED  ----- */








// *****************************************************************************************





//**** To login the user with correct creds   /auth/login        ---- No LOGIN REQUIRED  ----- */
router.post('/login', [
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password cannot be blank").exists()

], async (req, res) => {


    let success = false;

    try {


        //*********Express validation */
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        const { email, password } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
            success = false
            return res.json({ success, error: "Please check the credentials!" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {
            success = false
            return res.json({ success, error: "Please enter a valid password" });
        }


        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });


    }


    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }



})








// -------------------------------------------------------------------

// VENDOR LOGIN

router.post('/vendorlogin', [
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password cannot be blank").exists()

], async (req, res) => {


    let success = false;

    try {


        //*********Express validation */
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        const { email, password } = req.body;

        let user = await Organizer.findOne({ email });
        if (!user) {
            return res.json({ success, error: "Please check the credentials!" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {
            success = false
            return res.json({ success, error: "Please enter a valid password" });
        }


        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });


    }


    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }



})















//-------------------------------------------------------






// ---------------------------------------------------------------












// -------------------------------
// TO FETCH ORGANIZER

// API endpoint to fetch organizer data
router.get('/organizers', async (req, res) => {
    try {
        const organizers = await Organizer.find();
        res.status(200).json(organizers);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching organizer data' });
    }
});










// **** To get the user details   /auth/getuser        ---- LOGIN REQUIRED  ----- */
router.get('/getuser', fetchuser, async (req, res) => {

    try {
        const userId = req.user.id;

        const user = await User.findById(userId).select('-password');
        res.send(user);
    }

    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }

})




// **** To get the organizer details   /auth/getorganizer        ---- LOGIN REQUIRED  ----- */
router.get('/getorganizer', fetchuser, async (req, res) => {

    try {
        const userId = await req.user.id;
        console.log("userId-", userId)

        const user = await Organizer.findById(userId).select('-password');

        res.send(user);
    }

    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }

})











// ---------------------- FOR Deleting the user-/
router.delete('/deleteuser/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Check if the user with the given ID exists
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }
  
      // Delete the user
      await User.findByIdAndDelete(userId);
  
      res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  });








  //FOR deleting the organizer
  router.delete('/deleteorganizer/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Check if the user with the given ID exists
      const user = await Organizer.findById(userId);
  
      if (!user) {
        return res.status(404).json({ success: false, error: 'User not found' });
      }
  
      // Delete the user
      await Organizer.findByIdAndDelete(userId);
  
      res.json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ success: false, error: 'Internal server error' });
    }
  });











// API endpoint to fetch organizer data
router.get('/getusers', async (req, res) => {
    try {
        const organizers = await User.find();
        res.status(200).json(organizers);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching organizer data' });
    }
});







router.post('/sendmail', (req, res) => {

    const { to, senderEmail, subject, description, senderName, senderDate , senderNumber} = req.body;
    console.log("Name",senderEmail)


    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'momentmakers.services@gmail.com',
            pass: 'vjjfacrkdozojrtl',
        },
    });


    let mailOptions = {
        from: 'momentmakers.services@gmail.com',
        to: to,
        subject: subject,
        text: description,
        html:
            `<div style="padding:10px;" >
        <h1>Message Request From Moment Makers</h1>
        <h4>Sender Details</h4>
        <ul>
        <li><b>Sender Name:</b>${senderName}</li>
        <li><b>Email:</b> ${senderEmail}</li>
        <li><b>Is available for??:</b> ${senderDate}</li>
        <li><b>Contact Number:</b> ${senderNumber}</li>


        
  
        </ul>
        <h4 style="padding-bottom:4px;">Message</h4>
        <p>${subject}</p>

      </div>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });



})












router.post('/email-send', [
    body('email', "Enter a valid email").isEmail()

], async (req, res) => {


    let success = false;

    try {


        //*********Express validation */
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        const { email } = req.body;

        let user = await User.findOne({ email });
        if (!user) {
            success = false
            return res.status(400).json({ success, error: "Email does not exits!" });
        }


        let otpcode = Math.floor((Math.random() * 10000) + 1)

        let otpData = new Otp({
            email: req.body.email,
            otp: otpcode,
            expiredIn: new Date().getTime() + 300 * 1000
        })


        let otpResponse = await otpData.save();
        success = true




        ////For sending mail



        if (otpResponse) {
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'momentmakers.services@gmail.com',
                    pass: 'vjjfacrkdozojrtl',
                },
            });


            let mailOptions = {
                from: 'momentmakers.services@gmail.com',
                to: email,
                subject: otpcode,
                html:
                    `<div style="padding:10px;" >
            <p>Your OTP is</p>
            <ul>
            <li>OTP: ${otpcode}</li>
      
            </ul>
          </div>`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    res.status(500).send('Error sending email');
                } else {
                    console.log('Email sent: ' + info.response);
                    success = true
                    res.status(200).send('Email sent successfully');
                }
            });


        }



        res.json({ success });



    }


    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }



})









///FOR sending email to the vendor
router.post('/vendor-email-send', [
    body('email', "Enter a valid email").isEmail()

], async (req, res) => {


    let success = false;

    try {


        //*********Express validation */
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        const { email } = req.body;

        let user = await Organizer.findOne({ email });
        if (!user) {
            success = false
            return res.json({ success, error: "Email does not exists!" });
        }


        let otpcode = Math.floor((Math.random() * 10000) + 1)

        let otpData = new Otp({
            email: req.body.email,
            otp: otpcode,
            expiredIn: new Date().getTime() + 300 * 1000
        })


        let otpResponse = await otpData.save();
        success = true




        ////For sending mail



        if (otpResponse) {
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'momentmakers.services@gmail.com',
                    pass: 'vjjfacrkdozojrtl',
                },
            });


            let mailOptions = {
                from: 'momentmakers.services@gmail.com',
                to: email,
                subject: otpcode,
                html:
                    `<div style="padding:10px;" >
            <p>Your OTP is</p>
            <ul>
            <li>OTP: ${otpcode}</li>
      
            </ul>
          </div>`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    res.json({success:false, error:'Error sending email'});
                } else {
                    console.log('Email sent: ' + info.response);
                    success = true
                    res.status(200).send('Email sent successfully');
                }
            });


        }



        res.json({ success });



    }


    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }



})














router.post("/otp-verify", async (req, res) => {
    const { otp, password, email } = req.body;
    console.log(password)
    console.log(email)


    let myotp = await Otp.findOne({ otp });
    if (!myotp) {
        success = false
        return res.status(400).json({ success, error: "Incorrect OTP" });
    }



    // let user = await User.updateOne({email:email}, {$set:{
    //     password:secPassword
    // }} );
    // console.log(user);

    //Hashing the password to secure it using bcryptJS
    const salt = await bcrypt.genSaltSync(10);
    const secPassword = await bcrypt.hash(password, salt);
    let user = await User.updateOne({email:email}, {$set:{
        password:secPassword
    }} );

    // user.password = secPassword;
    success = true;
    res.status(200).json({ success, message: "Password Changed Successfully..." });





})















///For verifying Vendor OTP
router.post("/vendor-otp-verify", async (req, res) => {
    const { otp, password, email } = req.body;
    console.log(password)
    console.log(email)


    let myotp = await Otp.findOne({ otp });
    if (!myotp) {
        success = false
        return res.status(400).json({ success, error: "Incorrect OTP" });
    }



    // let user = await User.updateOne({email:email}, {$set:{
    //     password:secPassword
    // }} );
    // console.log(user);

    //Hashing the password to secure it using bcryptJS
    const salt = await bcrypt.genSaltSync(10);
    const secPassword = await bcrypt.hash(password, salt);
    let user = await Organizer.updateOne({email:email}, {$set:{
        password:secPassword
    }} );

    // user.password = secPassword;
    success = true;
    res.status(200).json({ success, message: "Password Changed Successfully..." });





})




















router.post('/page1/createadmin', [

    body('email', "Enter a valid email").isEmail(),
    body('password', "Enter valid password").isLength({ min: 5 })


],


    async (req, res) => {
        //console.log(req.body);

        //********************** */ For storing data into mongo database without validation
        // const user = User(req.body);
        // user.save();

        let success = false;



        try {


            //*********Express validation */
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success, errors: errors.array() });
            }

            let user = await Admin.findOne({ email: req.body.email });
            if (user) {
                return res.status(400).json({ success, error: "Sorry, a user with this email already exists..." });
            }



            //Hashing the password to secure it using bcryptJS
            const salt = await bcrypt.genSaltSync(10);
            const secPassword = await bcrypt.hash(req.body.password, salt);


            user = await Admin.create({
                email: req.body.email,
                password: secPassword,
            })



            const data = {
                user: {
                    id: user.id
                }
            }

            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            console.log({ success, authToken });
            res.json({ success, authToken });





        }


        catch (error) {
            console.error(error);
            res.status(500).send("Internal Server Error");
        }


        // .then(user => res.json(user))
        // .catch(err=> {console.log(err)
        // res.json({error:"Email is already in use", message:err.message})});

    })
















//**** To login the user with correct creds   /auth/adminlogin        ---- No LOGIN REQUIRED  ----- */
router.post('/adminlogin', [
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password cannot be blank").exists()

], async (req, res) => {


    let success = false;

    try {


        //*********Express validation */
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success, errors: errors.array() });
        }

        const { email, password } = req.body;

        let user = await Admin.findOne({ email });
        if (!user) {
            return res.json({ success, error: "Please check the credentials!" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {
            return res.json({ success, error: "Please check the credentials" });
        }


        const data = {
            user: {
                id: user.id
            }
        }

        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authToken });



    }


    catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }



})






// -----------------------------------------------------------------


















module.exports = router;