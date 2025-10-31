import express from 'express';
import redisClient from './src/config/redisClient.js';

const app = express();
const PORT = process.env.PORT || 3001;


const cache = async (req, res, next) => {
  const { id } = req.params;
  const cachedData = await redisClient.get(`user:${id}`);

  if (cachedData) {
    console.log("Cache hit");
    return res.json(JSON.parse(cachedData));
  }

  console.log("Cache miss");
  next();
};

// Example route
app.get("/user/:id", cache, async (req, res) => {
  const { id } = req.params;

  // simulate DB fetch
  const user = { id, name: "John Doe", age: 25 };

  // store in Redis cache for 1 hour
  await redisClient.setEx(`user:${id}`, 3600, JSON.stringify(user));

  res.json(user);
});



app.get('/test', (req, res) => {
  return res.status(200).json({ message: 'Server is running!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});