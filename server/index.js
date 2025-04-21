
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;

// In-memory data for demo
let USERS = [];
let PROGRESS_DB = {};

const USERS_FILE = './users.json';

function saveUsersToFile() {
  fs.writeFileSync(USERS_FILE, JSON.stringify(USERS, null, 2));
}
function loadUsersFromFile() {
  if (fs.existsSync(USERS_FILE)) {
    USERS = JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
  }
}
loadUsersFromFile();

// CORS policy for frontend preview/localhost
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://preview--career-pathways-launchpad.lovable.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Sign up
app.post('/api/users', (req, res) => {
  const { fullName, email, password, dreamJob, dailyTime } = req.body;
  if (USERS.some(u => u.email === email)) {
    return res.status(409).send('Email already exists');
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
  // Do not return password!
  const { password: pw, ...safeUser } = user;
  res.status(201).json(safeUser);
});

// Login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = USERS.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const { password: pw, ...safeUser } = user;
  res.json(safeUser);
});

// Get user profile
app.get('/api/users/:email', (req, res) => {
  const email = decodeURIComponent(req.params.email);
  const user = USERS.find(u => u.email === email);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const { password: pw, ...safeUser } = user;
  res.json(safeUser);
});

// Save progress
app.post('/api/progress', (req, res) => {
  const { userId, roadmapId, progress } = req.body;
  if (!PROGRESS_DB[userId]) PROGRESS_DB[userId] = {};
  PROGRESS_DB[userId][roadmapId] = progress;
  res.status(200).json({ userId, roadmapId, progress, message: 'Progress updated' });
});

// Mock roadmaps/resources endpoints as before
app.get('/api/roadmaps', (req, res) => {
  const roadmaps = [
    { id: '1', title: 'Web Development', description: 'Learn full-stack web development', progress: 0 },
    { id: '2', title: 'Machine Learning', description: 'Master machine learning concepts', progress: 0 },
    { id: '3', title: 'Mobile Development', description: 'Build native mobile applications', progress: 0 }
  ];
  res.status(200).json(roadmaps);
});
app.get('/api/resources', (req, res) => {
  const resources = [
    { id: '1', title: 'JavaScript Fundamentals', url: 'https://javascript.info', category: 'web' },
    { id: '2', title: 'Python for Data Science', url: 'https://pythonfordatascience.org', category: 'data' },
    { id: '3', title: 'React Native Tutorials', url: 'https://reactnative.dev', category: 'mobile' }
  ];
  res.status(200).json(resources);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
