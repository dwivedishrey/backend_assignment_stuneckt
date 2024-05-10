import React, { useEffect, useState } from "react";
import Post from "./Post/Post";
import "./Feed.css";
import TweetBox from "./TweetBox/TweetBox";
import axios from "axios";

const Feed=()=> {
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
      fetch('http://localhost:5000/userPost')
          
         .then(res=>res.json())
         .then(data=>{
           console.log(data)
           setPosts(data)
           
         })
    },[posts])
  
   

    return (
        <div className="feed">
            <div className="feed__header">
                <h2>Home</h2>
            </div>
            <TweetBox />
            {
                posts.map(p => <Post key={p._id} p={p} />)
            }
        </div>

    )

}

export default Feed