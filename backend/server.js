import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
const port = 5000;

const mongoURI = 'mongodb://localhost:27017/concentration';

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const scoreSchema = new mongoose.Schema({
  //player: String, //Don't use for now
  record: Number
});

const Score = mongoose.model('Score', scoreSchema);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  console.log("Backend server is running");
  res.send("Backend server is running");
})

app.get("/api/score", async (req, res) => {
  try {
    const score = await Score.findOne();
    if (score) {
      res.json({score: score.record});
    } else {
      res.status(404).json({ message: 'Score not found'});
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error});
  }
})

app.put("/api/change", async (req, res) => {
  const { record } = req.body;

  try {
    const updatedScore = await Score.findOneAndUpdate(
      {},
      { record: record },
      { new: true }
    );

    if (updatedScore) {
      res.json({ score: updatedScore.record });
    } else {
      res.status(404).json({ message: 'Score not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})