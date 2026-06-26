const axios = require("axios");

async function scrapeNews() {
  try {
    const articles = [
      {
        title: "OpenAI launches new model",
        source: "BBC",
        publishedAt: new Date().toISOString(),
        link: "https://example.com"
      }
    ];

    const response = await axios.post(
      "http://localhost:5000/ingest/trigger",
      {
        articles
      }
    );

    console.log(response.data);
  } catch (error) {
    console.error(error.message);
  }
}

scrapeNews();