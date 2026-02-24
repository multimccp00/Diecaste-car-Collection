# Car Collection App

This repository contains a full-stack application for managing a die-cast car collection. It consists of:

- **backend/** – Node.js + Express server with MySQL database integration.
- **client/** – React frontend that consumes the backend API.

> Note: The GitHub repo was deleted, so you'll need to reinitialize or push this code into a new remote if desired.

## Setup

### Backend

1. Navigate to `backend/`:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` or `dbConnection.js` (ignored by Git) to store database credentials. Example `.env` variables:
   ```env
   DB_HOST=db.tugapt.nl
   DB_PORT=3306
   DB_USER=mccp
   DB_PASS=mccp
   DB_NAME=colection
   PORT=8800
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. The API will be available at `http://localhost:8800` (or the value of `PORT`).

#### Docker (optional)

A Dockerfile and `docker-compose.yml` are provided under `backend/docker`. Use these to build a containerized backend:

```bash
cd backend/docker
docker-compose build
docker-compose up
```

### Client

1. Navigate to `client/`:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend:
   ```bash
   npm start
   ```

4. The React app will run on `http://localhost:3000` by default and make requests to the backend API.

## Deployment

- The frontend can be built (`npm run build`) and deployed as static files (e.g. GitHub Pages, Netlify).
- The backend must run on a server or container. Configure environment variables for database connectivity and the server port.

## Security

- Database credentials are kept out of version control. `dbConnection.js` and `.env` are ignored by Git.
- API endpoints are currently open; add authentication/authorization before exposing publicly.

## Notes

- If you need to reset commit history, remove the `.git` directory and run `git init` again.
- The code includes filters and grouping for car listings, and supports CRUD operations via REST endpoints.

Enjoy building your car collection app! 🚗
