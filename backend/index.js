const connectToMongo = require("./database/db");
const express = require('express')

const path = require('path');

const cors = require('cors');
// //For connecting the Database To MongoDB
connectToMongo();






//Express APIs
const app = express()
const port = 5000



//Middleware for the "req" 
app.use(express.json());







app.use(cors({
  origin: ['http://localhost:5000', 'http://localhost:3000', '*', 'http://localhost:8000'],
  credentials: true,
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']

}));

app.use(cors({
  origin: '*',
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']

}));




//Available Routes

app.get('/login', (req, res) => {
  res.send("Login");
});








app.use('/auth', require("./routes/auth"));


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


