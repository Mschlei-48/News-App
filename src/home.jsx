import { useEffect, useState } from 'react';
import axios from 'axios';
import './home-style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faFire } from '@fortawesome/free-solid-svg-icons';

function Home() {
  const [increment, setIncrement] = useState(8);
  const [data, setData] = useState([]);
  const [properties, setProperties] = useState([]);
  const [FilData, setFilData] = useState([]);
  const [category, setCategory] = useState("All");

  const getNews = async () => {
    let response;
    if (category === "All") {
      response = await axios.get("https://newsapi.org/v2/everything?q=bitcoin&apiKey=1d807c8f424748758e9d8a09c2e30d80");
    }
     else if (category === "US-Ent") {
      response = await axios.get("https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=1d807c8f424748758e9d8a09c2e30d80");
    }
    else if (category === "US-Pol") {
      response = await axios.get("https://newsapi.org/v2/top-headlines?country=us&category=politics&apiKey=1d807c8f424748758e9d8a09c2e30d80");
    }
    else if (category === "US-Sports") {
      response = await axios.get("https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=1d807c8f424748758e9d8a09c2e30d80");
    }
    setData(response.data.articles);
    if (response.data.articles.length > 0) {
      setProperties(Object.keys(response.data.articles[0]));
    }
  };

  useEffect(() => {
    getNews();
  }, [category]);

  useEffect(() => {
    if (data.length > 0 && properties.length > 0) {
      setFilData(data.filter(item =>
        properties.every(prop => item[prop] !== undefined && item[prop] !== null)
      ));
    }
  }, [data, properties]);

  const renderArticle = (index) => {
    if (FilData.length > index) {
      const article = FilData[index];
      return (
        <div className="articles" key={index}>
          <img src={article.urlToImage} alt={article.title} />
          <p className="title">{article.title}</p>
          <p className="description">{article.description.slice(0, 20)}...<a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a></p>
          <p className="date">{new Date(article.publishedAt).toLocaleDateString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container">
      <div className="navbar">
      <h3 id="name">Heated News</h3>
      <p id="line">|</p>
        <button className="nav-button" onClick={() => setCategory("All")}>All</button>
        <button className="nav-button" onClick={() => setCategory("US-Ent")}>Entertainment</button>
        <button  className="nav-button" onClick={() => setCategory("US-Pol")}>Politics</button>
        <button className="nav-button" onClick={() => setCategory("US-Sports")}>Sports</button>
      </div>
      <div className="welcome">
        <p>Welcome to Heated News</p>
        <p id="catchy-intro">
          Stay informed and stay ahead with <span style={{ color: 'red', fontWeight: 'bold' }}>Heated News—your go-to 
          source</span> <FontAwesomeIcon icon={faBook}/> for the hottest headlines and breaking stories. 
         Dive into the 
          stories that matter with <span style={{ color: 'red', fontWeight: 'bold' }}>Heated News!</span> <FontAwesomeIcon icon={faFire}/>
          </p>
        {/* <h1>News Mayonnaise</h1> */}
      </div>
      <br></br>
      <br></br>
      {FilData.length > 0 ? (
        <div className="main-container">
          {Array.from({ length: 8 }).map((_, i) => renderArticle(increment - 8 + i))}
        </div>
      ) : (
        <h1>No Data To Display</h1>
      )}
      <button className="next-button" onClick={() => setIncrement(increment + 8)}>Next</button>
    </div>
  );
}

export default Home;
