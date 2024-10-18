import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import routes from './routes/index.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files from client/dist
app.use(express.static(path.join(__dirname, '../client/dist')));

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the API routes
app.use(routes);

// Start the server
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));


// TODO: Serve static files of entire client dist folder

// TODO: Implement middleware for parsing JSON and urlencoded form data

// TODO: Implement middleware to connect the routes