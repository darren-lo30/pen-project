import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import session from 'express-session';
import router from './routes';

dotenv.config()

const app = express(); 

// Initialize sessions
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: false
}));

// CORS
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use(router);

export default app