import dotenv from 'dotenv';
import { Server } from './src/Server.js';

dotenv.config();

// Load app config from environment variables.
const {
    PORT = 8080,
    APP_CLIENT_ID,
    APP_CLIENT_SECRET
} = process.env;

const server = new Server({ APP_CLIENT_ID, APP_CLIENT_SECRET });
server.start(PORT);