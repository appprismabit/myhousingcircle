import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/test', (req, res) => {
  res.send('Hello, World CI/CD!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});