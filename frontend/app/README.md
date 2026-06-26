News Pulse

A full-stack news clustering application that groups related news articles into clusters and visualizes them through an interactive dashboard.

Features

* News cluster visualization
* Timeline chart
* Refresh data functionality
* Cluster-based article grouping
* REST API endpoints
* Responsive dashboard UI

Tech Stack

Frontend

* Next.js
* React
* Recharts

Backend

* Node.js
* Express

API Endpoints

GET /clusters

Returns all news clusters.

GET /clusters/:id

Returns a specific cluster.

POST /ingest

Triggers article ingestion.

Run Locally

Backend

cd backend
npm install
node server.js

Frontend

cd frontend
npm install
npm run dev

Future Improvements

* Real RSS feed integration
* Advanced clustering algorithms
* Source filtering
* Search functionality
* Live deployment