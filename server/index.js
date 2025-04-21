
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Roadmaps API
app.get('/api/roadmaps', (req, res) => {
  // Mock data for roadmaps
  const roadmaps = [
    { id: '1', title: 'Web Development', description: 'Learn full-stack web development', progress: 0 },
    { id: '2', title: 'Machine Learning', description: 'Master machine learning concepts', progress: 0 },
    { id: '3', title: 'Mobile Development', description: 'Build native mobile applications', progress: 0 }
  ];
  
  res.status(200).json(roadmaps);
});

// Resources API
app.get('/api/resources', (req, res) => {
  // Mock data for resources
  const resources = [
    { id: '1', title: 'JavaScript Fundamentals', url: 'https://javascript.info', category: 'web' },
    { id: '2', title: 'Python for Data Science', url: 'https://pythonfordatascience.org', category: 'data' },
    { id: '3', title: 'React Native Tutorials', url: 'https://reactnative.dev', category: 'mobile' }
  ];
  
  res.status(200).json(resources);
});

// User progress API
app.post('/api/progress', (req, res) => {
  const { userId, roadmapId, progress } = req.body;
  
  // In a real app, we would save this to a database
  console.log(`Updating progress for user ${userId} on roadmap ${roadmapId} to ${progress}%`);
  
  res.status(200).json({ 
    userId, 
    roadmapId, 
    progress,
    message: 'Progress updated successfully' 
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
