    
import { useEffect, useState } from 'react';
import axios from 'axios';
import './home-style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faFire } from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom'
import {FacebookShareButton, FacebookIcon,LinkedinShareButton, LinkedinIcon,TwitterShareButton,TwitterIcon,EmailShareButton,EmailIcon} from 'react-share'

function Home() {
  const [increment, setIncrement] = useState(8);
  const [data, setData] = useState([]);
  // const [properties, setProperties] = useState([]);
  const [FilData, setFilData] = useState([]);
  const [category, setCategory] = useState("everything");
  const [search,setSearch]=useState("")
  // const navigate=useNavigate()
  const getNews = async (category) => {
    let response;
    try{
      if(category==="everything"){
        response = await axios.get(`https://newsapi.org/v2/${category}?q=bitcoin&apiKey=1d807c8f424748758e9d8a09c2e30d80`);
      }
      else{
        response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=1d807c8f424748758e9d8a09c2e30d80`);

      }
      setData(response.data.articles);
      // console.log(response.data.articles[0])
      
    }
    catch(error){
      console.error("Error:",error)
    }  

  };

  useEffect(() => {
    getNews(category);
  },[category]);

 

  // console.log("Data:",data)
  const renderArticle = () => {
    if (data.length >0 ) {
      // const article = data;
      const articles=data.filter((record)=>record.title.toLowerCase().includes(search.toLowerCase()))
      console.log("Article:",articles.length)
      return (
        articles.map((article,index) => (
        <div className="card" style={{width: "13rem",height:"15rem"}} key={index}>
          {/* <p>{index}</p> */}
          <img src={article.urlToImage} className="card-img-top" alt={article.title.slice(0,50)}/>
          <div className="card-body">
            <h5 className="card-title">{article.title}</h5>
            <p className="card-text">{(article.description && article.description.slice(0, 20)) || 'No description'}..<a className="btn btn-primary" href={article.url}>Read More</a></p>
          </div>
          <FacebookShareButton url={window.location.href}>
              <FacebookIcon size={28} style={{borderRadius:"15px",marginRight:"4px"}}/>
            </FacebookShareButton>

            <LinkedinShareButton url={window.location.href}>
              <LinkedinIcon size={28} style={{borderRadius:"15px",marginRight:"4px"}}/>
            </LinkedinShareButton>

            <TwitterShareButton url={window.location.href}>
              <TwitterIcon size={28} style={{borderRadius:"15px",marginRight:"4px"}}/>
            </TwitterShareButton>

            <EmailShareButton url={window.location.href}>
                <EmailIcon size={28} style={{borderRadius:"15px",marginRight:"4px"}}/>
            </EmailShareButton>
      </div>
      )));
    }
    return null;
  };

  // console.log(FilData)
  return (
    <div className="container">
      <div className="navbar">
      <h3 id="name">Heated News</h3>
      <p id="line">|</p>
        <button className="nav-button" onClick={() => setCategory("everything")}>All</button>
        <button className="nav-button" onClick={() => setCategory("entertainment")}>Entertainment</button>
        <button  className="nav-button" onClick={() => setCategory("politics")}>Politics</button>
        <button className="nav-button" onClick={() => setCategory("sports")}>Sports</button>
        <input onChange={(event)=>setSearch(event.target.value)} placeholder="Search..." style={{height:"38px"}}></input>
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
      {data.length > 0 ? (
        <div className="main-container">
          {renderArticle()}
        </div>
      ) : (
        <h1>No Data To Display</h1>
      )}
      {/* <button className="next-button" onClick={() => setIncrement(increment + 8)}>Next</button> */}
    </div>
  );
}

export default Home;