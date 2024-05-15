const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
app.use(cors())
const port = 3000; // You can change the port as needed

// Connection URI and database configuration
const uri = "mongodb+srv://ipdguys:Arh4mjJjJRKZmAeR@cluster0.ewytcbs.mongodb.net/?retryWrites=true&w=majority"; // Your MongoDB connection URI goes here
const dbName = 'AISPECS';
const collectionName = 'Tasks';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Function to convert time string to total seconds
function timeToSeconds(timeStr) {
  const [hours, minutes, seconds] = timeStr.split(' ').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

// Endpoint for fetching data
app.get('/api/tasks', async (req, res) => {
  try {
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Perform a find operation on the collection
    const tasks = await collection.find({}).toArray();

    let totalDifferences = {
      'No Detections': 0,
      'Book': 0,
      'Instagram': 0
    };

    for (let i = 0; i < tasks.length - 1; i++) {
      const timeDiff = Math.abs(timeToSeconds(tasks[i].Time) - timeToSeconds(tasks[i + 1].Time));

      // Add the time difference to the current (previous) task
      if (tasks[i].Date === tasks[i + 1].Date) {
        const taskType = tasks[i].Task;
        totalDifferences[taskType] += timeDiff;
      }
    }

    res.send(totalDifferences);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
