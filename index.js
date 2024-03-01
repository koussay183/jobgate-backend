const express = require('express');
var cors = require('cors')
// importing routes
const candidatRoutes = require('./routes/CandidatRoutes');
const entrepriseRoutes = require('./routes/EntrepriseRoutes');

const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

// coockies nst3mloha bch naamlo save ll data fl front w tb9a mawjoda bch ki nrj3o naamlo login y3adih tool

const app = express();

app.use(cors({
    allowedHeaders : "*",
    origin :"*"
}))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH');
    next();
});
  
app.use(express.json());
app.use(cookieParser());

// Use middleware for each user role
app.use('/c', candidatRoutes);
app.use('/e' , entrepriseRoutes)

// Endpoint to check if the user is logged in
app.get('/check-auth', (req, res) => {
    // Check if the HTTP-only cookie containing authentication information exists
    if (req.cookies && req.cookies.token) {
      // If the cookie exists, the user is authenticated
      // You might perform additional validation/authentication here if needed
      res.json({ loggedIn: true });
    } else {
      // If the cookie doesn't exist, the user is not logged in
      res.json({ loggedIn: false });
    }
  });
// Start the server
app.listen(3000, () => {
    // Connect to MongoDB 
    mongoose.connect('mongodb+srv://koussaybnit:SE2GpafNZ2bcvA8R@jobgate.rfthpgk.mongodb.net/?retryWrites=true&w=majority&appName=jobgate', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName : "JOBGATE"
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });
    console.log('Server is running on port 3000');
});