const mongoose = require('mongoose');

const { Schema } = mongoose;



const OtpSchema = new Schema({
  email:{
    type:String,
    required:true
  },
  otp:{
    type:String,
    required:true
  },
  expiredIn:Number,

  date:{
    type: Date,
    default: Date.now
  }

});




const Otp = mongoose.model('otpdetails', OtpSchema, 'otpdetails');
module.exports = Otp;