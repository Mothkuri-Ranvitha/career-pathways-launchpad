
# DevPath Backend Server

This is the backend server for the DevPath learning platform.

## Getting Started

1. Install dependencies:
   ```
   cd server
   npm install
   ```

2. Start the server:
   ```
   npm run dev
   ```

The server will run on http://localhost:5000 by default.

## Available APIs

- `GET /api/health` - Check server status
- `GET /api/roadmaps` - Get all roadmaps
- `GET /api/resources` - Get all learning resources
- `POST /api/progress` - Update user progress on a roadmap

## Running with Frontend

To run both frontend and backend together, you can:

1. Start the backend server in one terminal:
   ```
   cd server
   npm run dev
   ```

2. Start the frontend in another terminal:
   ```
   npm run dev
   ```
