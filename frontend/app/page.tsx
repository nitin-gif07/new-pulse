"use client";

import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Home() {
  const [clusters, setClusters] = useState<any[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
const [selectedCluster, setSelectedCluster] = useState<any>(null);

  const loadClusters = () => {
    fetch("http://localhost:5000/clusters")
      .then((res) => res.json())
      .then((data) => {
        console.log("Refresh button clicked");
        setClusters(data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadClusters();
  }, []);

  const chartData = clusters.map((cluster) => ({
    name: cluster.label,
    articles: cluster.articleCount,
  }));

  const filteredClusters = clusters.filter((cluster) =>
  cluster.label.toLowerCase().includes(searchTerm.toLowerCase())
);
const totalArticles = filteredClusters.reduce(
    (sum, cluster) => sum + cluster.articleCount,
    0
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: darkMode ? "#0f172a" : "#f3f6fb",
color: darkMode ? "white" : "black",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)",
          color: "white",
          padding: "30px",
          borderRadius: "20px",
          marginBottom: "25px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "38px",
            fontWeight: "bold",
          }}
        >
          📰 News Pulse Dashboard
        </h1>

        <p
          style={{
            marginTop: "10px",
            opacity: 0.9,
          }}
        >
          Real-time News Cluster Monitoring
        </p>
        <button
  onClick={() => setDarkMode(!darkMode)}
  style={{
    marginTop: "15px",
    marginRight: "10px",
    padding: "10px 18px",
    border: "none",
    borderRadius: "8px",
    background: darkMode ? "#334155" : "#ffffff",
    color: darkMode ? "#ffffff" : "#111827",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
  {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
</button>

        <button
          onClick={loadClusters}
          style={{
            marginTop: "15px",
            padding: "10px 18px",
            border: "none",
            borderRadius: "8px",
            background: "#ffffff",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          🔄 Refresh Data
        </button>
        <div style={{ marginTop: "20px" }}>
  <input
    type="text"
    placeholder="🔍 Search clusters..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    style={{
      padding: "12px",
      width: "100%",
      maxWidth: "400px",
      borderRadius: "10px",
      border: "none",
      fontSize: "16px",
    }}
  />
</div>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          marginBottom: "25px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
           background: darkMode ? "#1e293b" : "white",
color: darkMode ? "white" : "black",
            padding: "20px",
            borderRadius: "15px",
            flex: 1,
            minWidth: "220px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h3>Total Clusters</h3>
          <h1>{clusters.length}</h1>
        </div>

        <div
          style={{
            background: darkMode ? "#1e293b" : "white",
color: darkMode ? "white" : "black",
            padding: "20px",
            borderRadius: "15px",
            flex: 1,
            minWidth: "220px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <h3>Total Articles</h3>
          <h1>{totalArticles}</h1>
        </div>
      </div>

      {/* Timeline */}
      <div
        style={{
          background: darkMode ? "#1e293b" : "white",
color: darkMode ? "#ffffff" : "#111827",
          padding: "20px",
          borderRadius: "15px",
          marginBottom: "25px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <h2>📈 News Cluster Timeline</h2>

        <div style={{ width: "100%", height: 320 }}>
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="articles"
                stroke="#2563eb"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Cluster Cards */}
      <div
        style={{
          display: "grid",
          gap: "20px",
        }}
      >
        {filteredClusters.map((cluster) => (
          <div
  key={cluster.id}
  onClick={() => setSelectedCluster(cluster)}
            style={{
              background: "white",
              borderRadius: "15px",
              padding: "20px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              cursor: "pointer",
transition: "0.3s",
            }}
          >
            <h2
              style={{
                marginTop: 0,
                color: "#1e3a8a",
              }}
            >
              {cluster.label}
            </h2>

            <p>
              <strong>Articles:</strong> {cluster.articleCount}
            </p>

            <p>
              <strong>Start:</strong>{" "}
              {new Date(cluster.startTime).toLocaleString()}
            </p>

            <p>
              <strong>End:</strong>{" "}
              {new Date(cluster.endTime).toLocaleString()}
            </p>

            <hr />

            {cluster.articles?.map(
              (article: any, index: number) => (
                <div
                  key={index}
                  style={{
                    marginTop: "15px",
                    padding: "12px",
                    background: "#f8fafc",
                    borderRadius: "10px",
                  }}
                >
                  <h4>{article.title}</h4>

                  <p>
                    <strong>Source:</strong>{" "}
                    {article.source}
                  </p>

                  <a
                    href={article.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      color: "#2563eb",
                      fontWeight: "bold",
                    }}
                  >
                    Read Article →
                  </a>
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}