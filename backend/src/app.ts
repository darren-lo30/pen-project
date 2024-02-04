import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import router from './routes';
import passport from 'passport';
import { sessionMiddleware } from './config/sessionConfig';

dotenv.config();

const app = express(); 

// Initialize sessions
app.use(sessionMiddleware);

// CORS
app.use(cors({
  origin: true,
  credentials: true,
})); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());


app.use(router);

export { sessionMiddleware };
export default app;