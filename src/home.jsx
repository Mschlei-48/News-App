import {useEffect, useState} from 'react'
import axios from 'axios'
// import {useEffect} from 'react'
import './home-style.css'

function Home(){

    const [increment,setIncrement]=useState(8);
    const [data,setData]=useState([])
    const [properties,setProperties]=useState([])
    const [FilData,setFilData]=useState([])

    useEffect(() => {
        getNews();
      }, []);

    // The seond useEffect sets the FilData but only if the data and properties parts change
      useEffect(() => {
        if (data.length > 0 && properties.length > 0) {
          setFilData(data.filter(item =>
            properties.every(prop => item[prop] !== undefined && item[prop] !== null)
          ));
        }
      }, [data, properties]);



    const [category,setCategory]=useState("All")
    const getNews=async() =>{
        
        if(category=="All"){
            const response=await axios.get("https://newsapi.org/v2/everything?q=bitcoin&apiKey=1d807c8f424748758e9d8a09c2e30d80")
            setData(response.data.articles)
            if (response.data.articles.length > 0) {
                setProperties(Object.keys(response.data.articles[0]));
              }
            console.log(data[0].title)
        }
        else if(category=="US-Ent"){
            const response=await axios.get("https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=1d807c8f424748758e9d8a09c2e30d80")
            setData(response.data.articles)
            if (response.data.articles.length > 0) {
                setProperties(Object.keys(response.data.articles[0]));
              }
            console.log(data[0].title)
        }
        
      }

      console.log(FilData) 
    //    console.log(properties)  
    return(
        
        <div className="container">
            <h1>Get Latest News</h1>
            <div>
                <button onClick={()=>setCategory("All")}>All</button>
                <button onClick={()=>setCategory("US-Ent")}>US Entertainment</button>
            </div>
            <br></br>
            <br></br>
            {FilData.length>0 ? (
        <div className="main-container">
            <div className="articles">
               <img src={FilData[increment-8].urlToImage} alt={FilData[increment-8].title}/> 
               <p className="title">{FilData[increment-8].title}</p>
               <p className="description">{FilData[increment-8].description.slice(0,20)}...<a>Read More</a></p>
               <p className="date">{FilData[increment-8].publishedAt}</p>
            </div>
            <div className="articles">
                <img src={FilData[increment-7].urlToImage} alt={FilData[increment-7].title}/>
                <p className="title"> {FilData[increment-7].title}</p>
                <p className="description">{FilData[increment-7].description.slice(0,20)}...<a>Read More</a></p>
                <p className="date">{FilData[increment-7].publishedAt}</p>
                </div>
            <div className="articles">
                <img src={FilData[increment-6].urlToImage} alt={FilData[increment-6].title}/>
                <p className="title">{FilData[increment-6].title}</p>
                <p className="description">{FilData[increment-6].description.slice(0,20)}...<a>Read More</a></p>
                <p className="date">{FilData[increment-6].publishedAt}</p>
                </div>
            <div className="articles">
                <img src={FilData[increment-5].urlToImage} alt={FilData[increment-5].title}/>
                <p className="title">{FilData[increment-5].title}</p>
                <p className="description">{FilData[increment-5].description.slice(0,20)}...<a>Read More</a></p>
                <p className="date">{FilData[increment-5].publishedAt}</p>
                </div>
            <div className="articles">
                <img src={FilData[increment-4].urlToImage} alt={FilData[increment-4].title}/>
                <p className="title">{FilData[increment-4].title}</p>
                <p className="description">{FilData[increment-4].description.slice(0,20)}...<a>Read More</a></p>
                <p className="date">{FilData[increment-4].publishedAt}</p>
            </div>
            <div className="articles">
                <img src={FilData[increment-3].urlToImage} alt={FilData[increment-3].title}/>
                <p className="title">{FilData[increment-3].title}</p>
                <p className="description">{FilData[increment-3].description.slice(0,20)}...<a>Read More</a></p>
                <p className="date">{FilData[increment-3].publishedAt}</p>
            </div>
            <div className="articles">
                <img src={FilData[increment-2].urlToImage} alt={FilData[increment-2].title}/>
                <p className="title">{FilData[increment-2].title}</p>
                <p className="description">{FilData[increment-2].description.slice(0,20)}...<a>Read More</a></p>
                <p className="date">{FilData[increment-2].publishedAt}</p>
            </div>
            <div className="articles">
                <img src={FilData[increment-1].urlToImage} alt={FilData[increment-1].title}/>
                <p className="title">{FilData[increment-1].title}</p>
                <p className="description">{FilData[increment-1].description.slice(0,20)}...<a>Read More</a></p>
                <p className="date">{FilData[increment-1].publishedAt}</p>
            </div>
        </div>
        
    ):(
        <h1>No Data To Display</h1>
    )}
    <button className="next-button" onClick={()=>setIncrement(increment+8)}>Next</button>
        </div>
    )
}
export default Home;