import session from 'express-session';

const sessionMiddleware = session({
  secret: 'secret',
  resave: true,
  saveUninitialized: false
});

export { sessionMiddleware };