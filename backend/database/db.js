const mongoose = require('mongoose');




const connectToMongo = ()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/momentmakers");
    mongoose.connection.on('connected', () => console.log('Connected'));
    mongoose.connection.on('error', (err) => console.log('Connection failed with - ',err));
}


module.exports = connectToMongo;
