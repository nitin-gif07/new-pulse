const express = require("express");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const jobs = {};

const clusters = [
  {
    id: 1,
    label: "AI News",
    articleCount: 3,
    startTime: "2026-06-25T10:00:00Z",
    endTime: "2026-06-26T10:00:00Z",
    articles: [
      {
        title: "OpenAI launches new model",
        source: "BBC",
        publishedAt: "2026-06-25T10:00:00Z",
        link: "https://example.com"
      }
    ]
  }
];

app.get("/clusters", (req, res) => {
  res.json(clusters);
});

app.get("/clusters/:id", (req, res) => {
  const cluster = clusters.find(
    c => c.id === parseInt(req.params.id)
  );

  if (!cluster) {
    return res.status(404).json({
      message: "Cluster not found"
    });
  }

  res.json(cluster);
});

app.get("/timeline", (req, res) => {
  const timeline = clusters.map(cluster => ({
    id: cluster.id,
    label: cluster.label,
    start: cluster.startTime,
    end: cluster.endTime,
    articleCount: cluster.articleCount
  }));

  res.json(timeline);
});

app.post("/ingest/trigger", (req, res) => {
  const jobId = uuidv4();

  jobs[jobId] = {
    status: "completed"
  };

  res.json({
    jobId,
    status: "completed"
  });
});

app.get("/ingest/status/:jobId", (req, res) => {
  const job = jobs[req.params.jobId];

  if (!job) {
    return res.status(404).json({
      message: "Job not found"
    });
  }

  res.json(job);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});