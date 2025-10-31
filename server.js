import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import redisClient from './src/config/redisClient.js';
import morgan from 'morgan';
import { connectDB } from './src/config/database.js';


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

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

app.get("/user/:id", cache, async (req, res) => {
  const { id } = req.params;

  // simulate DB fetch
  const user = { id, name: "John Doe", age: 25 };

  // store in Redis cache for 1 hour
  await redisClient.setEx(`user:${id}`, 3600, JSON.stringify(user));

  res.json(user);
});

app.get('/users', async (req, res) => {
  try {
    const db = await connectDB();
    const query = await db.collection("users").findOne({
      phone: "9129922459"
    });

    return res.status(200).json({
      message: "User data fetched successfully!",
      data: query
    });
  } catch (e) {
    return res.status(500).json({
      message: "Some error occured!",
      error: e.message
    });
  }

});


app.get('/test', (req, res) => {
  return res.status(200).json({ message: 'Server is running!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});