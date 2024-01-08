import app from './app';

// Star the server on an environment defined port or default to 3000
const port = process.env.port || 3000;

app.listen(port, async() => {
  console.log(`Listening on port ${port}.`);
});