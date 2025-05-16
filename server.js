const express = require('express');
const mongoose = require('mongoose');
const Contact = require('./models/Contact');
const path = require('path');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();
const app = express();
const PORT = 3000;


mongoose.connect('mongodb://localhost:27017/portfolioDB')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


const Project = mongoose.model('Project', {
  title: String,
  description: String,
  link: String
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/about.html')));
app.get('/contact', (req, res) => res.sendFile(path.join(__dirname, 'public/contact.html')));
app.get('/projects', async (req, res) => {
  const projects = await Project.find();
  res.render('projects', { projects });
});

app.post('/projects', async (req, res) => {
  const { title, description, link } = req.body;
  await Project.create({ title, description, link });
  res.redirect('/projects');
});

app.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});



// Routes
app.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.send('Message received. Thank you!');
  } catch (error) {
    res.status(500).send('Error saving message.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});













// Serve static files from "public" folder
app.use(express.static('public'));

// Route for /myworks
app.get('/myworks', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'myworks.html'));
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
