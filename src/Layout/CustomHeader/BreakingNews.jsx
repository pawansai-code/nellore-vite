import { useEffect, useState } from "react";
import "./BreakingNews.css";

const BreakingNews = () => {
  const [breakingNews, setBreakingNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://newsapi.org/v2/everything?q=Nellore&language=en&sortBy=publishedAt&apiKey=65332609237d43e9ac14eb5c20d87394" //api key for news from newsapi.org
        );
        const data = await response.json();
        if (data.articles) {
          // Extract titles and limit to first 10 to clear clutter if needed, or take all.
          // Taking top 10 for the ticker.
          const titles = data.articles
            .map((article) => article.title)
            .slice(0, 10);
          setBreakingNews(titles);
        }
      } catch (error) {
        console.error("Error fetching breaking news:", error);
      }
    };

    fetchNews();
  }, []);

  const newsContent =
    breakingNews.length > 0 ? (
      breakingNews.map((news, index) => (
        <span key={index} className="news-item">
          {news}
          {index < breakingNews.length - 1 && (
            <span className="separator"> • </span>
          )}
        </span>
      ))
    ) : (
      <span className="news-item">Loading live updates...</span>
    );

  return (
    <div className="breaking-news-container">
      <div className="d-flex">
        <div className="breaking-news-banner">
          <span className="pulse-icon">((o))</span>
          <span className="breaking-news-text">BREAKING NEWS</span>
        </div>
        <div className="news-ticker">
          <div className="ticker-wrapper">
            <div className="ticker-content">
              {newsContent}

              {breakingNews.length > 0 && (
                <>
                  <span className="ticker-spacer"> • </span>
                  {newsContent}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;