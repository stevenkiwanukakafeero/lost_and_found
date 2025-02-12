const express = require('express'); // Web framework for Node.js
const mysql = require('mysql'); // MySQL library
const multer = require('multer'); // For handling file uploads
const cors = require('cors'); // Enable CORS for frontend-backend communication
const bodyParser = require('body-parser'); // Parse request bodies

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Allow requests from all origins
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// MySQL Database Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password', // Replace with your MySQL root password
  database: 'lost_and_found', // Replace with your database name
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    process.exit(1); // Exit if there's an error
  }
  console.log('Connected to MySQL database.');
});

// Setup multer for file uploads
const upload = multer({ dest: 'uploads/' }); // Files will be stored in the "uploads" folder

// Serve static files (uploaded images)
app.use('/uploads', express.static('uploads'));

// Route: Get all items
app.get('/items', (req, res) => {
  const query = 'SELECT * FROM items';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching items:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.json(results); // Send items as JSON
  });
});

// Route: Add a new item
app.post('/items', upload.single('image'), (req, res) => {
  const { title, description, location, contact } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  const query = 'INSERT INTO items (title, description, location, contact, image_url) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [title, description, location, contact, imageUrl], (err, results) => {
    if (err) {
      console.error('Error inserting item:', err);
      res.status(500).send('Internal Server Error');
      return;
    }
    res.status(201).send('Item added successfully');
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
 