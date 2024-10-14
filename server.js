const express = require('express');
const mongoose = require('mongoose');
const noteRoutes = require('./routes/NoteRoutes'); // Adjust path if necessary

const app = express();
app.use(express.json()); // Body parser for JSON data

const DB_URL = "mongodb+srv://Gokuljinu:tyfGCV%263465@mycluster.trgzd.mongodb.net/comp3123-exec06?retryWrites=true&w=majority&appName=MyCluster";

mongoose.Promise = global.Promise;

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the MongoDB Atlas database.");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use(noteRoutes); // Use the note routes

app.get('/', (req, res) => {
    res.send("<h1>Welcome to Note Taking Application - Week06 Exercise</h1>");
});

app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});
