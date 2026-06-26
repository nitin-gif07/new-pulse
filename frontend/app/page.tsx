"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [clusters, setClusters] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/clusters")
      .then((res) => res.json())
      .then((data) => setClusters(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>News Clusters</h1>

      {clusters.map((cluster) => (
        <div
          key={cluster.id}
          style={{
            border: "1px solid #ccc",
            padding: "15px",
            marginBottom: "15px",
          }}
        >
          <h2>{cluster.label}</h2>
          <p>Articles: {cluster.articleCount}</p>

          {cluster.articles.map((article: any, index: number) => (
            <div key={index}>
              <h4>{article.title}</h4>
              <p>{article.source}</p>
              <a href={article.link} target="_blank">
                Read More
              </a>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}