
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// In-memory data for demo
let USERS = [];
let PROGRESS_DB = {};

const USERS_FILE = path.join(__dirname, 'users.json');

// Debug logging for file operations
function saveUsersToFile() {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(USERS, null, 2));
    console.log('Users saved to file successfully');
  } catch (error) {
    console.error('Error saving users to file:', error);
  }
}

function loadUsersFromFile() {
  try {
    if (fs.existsSync(USERS_FILE)) {
      USERS = JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
      console.log('Users loaded from file successfully');
    } else {
      console.log('Users file not found, starting with empty array');
    }
  } catch (error) {
    console.error('Error loading users from file:', error);
    USERS = []; // Reset to empty array on error
  }
}

// Load users on startup
loadUsersFromFile();

// Improved CORS configuration - accept all origins in development
app.use(cors({
  origin: '*', // Allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  console.log('Request body:', req.body);
  next();
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Sign up
app.post('/users', (req, res) => {
  console.log('Sign up request received:', req.body);
  const { fullName, email, password, dreamJob, dailyTime } = req.body;
  
  if (!fullName || !email || !password) {
    console.log('Missing required fields');
    return res.status(400).json({ message: 'Missing required fields' });
  }
  
  if (USERS.some(u => u.email === email)) {
    console.log('Email already exists:', email);
    return res.status(409).json({ message: 'Email already exists' });
  }
  
  const user = {
    id: Date.now().toString(),
    fullName,
    email,
    password,
    dreamJob,
    dailyTime,
  };
  
  USERS.push(user);
  saveUsersToFile();
  
  console.log('User created successfully:', user.id);
  
  // Do not return password!
  const { password: pw, ...safeUser } = user;
  res.status(201).json(safeUser);
});

// Login
app.post('/login', (req, res) => {
  console.log('Login request received');
  const { email, password } = req.body;
  const user = USERS.find(u => u.email === email && u.password === password);
  if (!user) {
    console.log('Invalid login attempt for:', email);
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  console.log('User logged in successfully:', user.id);
  const { password: pw, ...safeUser } = user;
  res.json(safeUser);
});

// Get user profile
app.get('/users/:email', (req, res) => {
  const email = decodeURIComponent(req.params.email);
  console.log('Profile request for:', email);
  const user = USERS.find(u => u.email === email);
  if (!user) {
    console.log('User not found:', email);
    return res.status(404).json({ message: "User not found" });
  }
  const { password: pw, ...safeUser } = user;
  res.json(safeUser);
});

// Save progress
app.post('/progress', (req, res) => {
  const { userId, roadmapId, progress } = req.body;
  console.log('Saving progress:', userId, roadmapId, progress);
  if (!PROGRESS_DB[userId]) PROGRESS_DB[userId] = {};
  PROGRESS_DB[userId][roadmapId] = progress;
  res.status(200).json({ userId, roadmapId, progress, message: 'Progress updated' });
});

// Mock roadmaps/resources endpoints as before
app.get('/roadmaps', (req, res) => {
  const roadmaps = [
    { id: '1', title: 'Web Development', description: 'Learn full-stack web development', progress: 0 },
    { id: '2', title: 'Machine Learning', description: 'Master machine learning concepts', progress: 0 },
    { id: '3', title: 'Mobile Development', description: 'Build native mobile applications', progress: 0 }
  ];
  res.status(200).json(roadmaps);
});

app.get('/resources', (req, res) => {
  const resources = [
    { id: '1', title: 'JavaScript Fundamentals', url: 'https://javascript.info', category: 'web' },
    { id: '2', title: 'Python for Data Science', url: 'https://pythonfordatascience.org', category: 'data' },
    { id: '3', title: 'React Native Tutorials', url: 'https://reactnative.dev', category: 'mobile' }
  ];
  res.status(200).json(resources);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`Signup endpoint: http://localhost:${PORT}/users`);
});
