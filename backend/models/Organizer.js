const mongoose = require('mongoose');

const { Schema } = mongoose;



const OrganizerSchema = new Schema({
  firstname:{
    type:String,
    required:true
  },

  pricing:{
    type:String,
    required:true
  },
  city:{
    type:String,
    required:true
  },
  state:{
    type:String,
    required:true
  },
  category:{
    type:String,
    required:true
  },


  email:{
    type:String,
    required:true,
    unique:true
  },

  phone:{
    type:String,
    required:true
  },

  password:{
    type:String,
    required:true
  },
  about:{
    type:String,
    required:true
  }
  ,
  charge1:{
    type:String
  },
  charge2:{
    type:String
  },
  
  image:{
    type:String
  },

  date:{
    type: Date,
    default: Date.now
  }

});




const Organizer = mongoose.model('organizer', OrganizerSchema);
module.exports = Organizer;