// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/dribbble', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a Mongoose schema and model for user data
const userSchema = new mongoose.Schema({
  name: String,
  username: String,
  email: String,
  password: String
});
const User = mongoose.model('User', userSchema);

// Route for handling form submission from index.html
app.post('/signup', (req, res) => {
  const { name, username, email, password } = req.body;

  const newUser = new User({
    name,
    username,
    email,
    password
  });

  newUser.save()
    .then(() => {
      res.redirect('/second.html'); // Redirect to a success page
    })
    .catch(err => {
      console.error('Error creating user:', err);
      res.status(500).send('Error creating user');
    });
});

// Route for serving index.html when users visit the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})