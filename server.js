import express from 'express';

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/test', (req, res) => {
  return res.status(200).json({ message: 'Server is running!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});