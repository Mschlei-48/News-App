import {useEffect, useState} from 'react'
import axios from 'axios'
// import {useEffect} from 'react'
import './home-style.css'

function Home(){
    useEffect(()=>{
        getNews();
    },[])
    const [increment,setIncrement]=useState(8);
    const [data,setData]=useState()

    const getNews=async() =>{
        const response=await axios.get("https://newsapi.org/v2/everything?q=bitcoin&apiKey=1d807c8f424748758e9d8a09c2e30d80")
        console.log(response.data)
        setData(response.data.articles)
        console.log(data[0].title)
      }
         
    return(
        <div>
            <h1>Get Latest News</h1>
        <div className="main-container">
            <div>
               <p>{data[increment-8].title}</p>
               <img src={data[increment-8].urlToImage}/> 
            </div>
            <div>
                {data[increment-7].title}
                <img src={data[increment-7].urlToImage}/>
                </div>
            <div>
                {data[increment-6].title}
                <img src={data[increment-6].urlToImage}/>
                </div>
            <div>
                {data[increment-5].title}
                <img src={data[increment-5].urlToImage}/>
                </div>
            <div>
                {data[increment-4].title}
                <img src={data[increment-4].urlToImage}/>
            </div>
            <div>
                {data[increment-3].title}
                <img src={data[increment-3].urlToImage}/>
            </div>
            <div>
                {data[increment-2].title}
                <img src={data[increment-2].urlToImage}/>
            </div>
            <div>
                {data[increment-1].title}
                <img src={data[increment-1].urlToImage}/>
            </div>
        </div>
        <button onClick={()=>setIncrement(increment+8)}>Next</button>
        </div>
    )
}
export default Home;