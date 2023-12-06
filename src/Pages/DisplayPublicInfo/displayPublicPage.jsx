import {React,useEffect,useState}from 'react'
import './displayPublic.css'
import { Link} from 'react-router-dom';

const DisplayPublicPage = () => {
  const [tweet,setTweet] = useState([]);
  const [image,setimage] = useState([]);
  const [video,setvideo] = useState([]);



  //get all tweets
  const GetAllTweets = async ()=>{
    try{
      const data = await fetch(`https://stackbackend-9z32.onrender.com/user/getTweet`,{
      method:'GET'
  })
  const res = await data.json()
  setTweet(res.data);
  }
  catch(err){
      console.log(err)
     }
  }

  //Get all Images
  const getImage = async ()=>{
    try{
      const data = await fetch(`https://stackbackend-9z32.onrender.com/user/getImage`,{
        method:'GET'
    })
    const res = await data.json()
    setimage(res.data);
    }
    catch(err){
      console.log(err)
    }
  }

  //Get all Videos
  const getVideo = async ()=>{
    try{
      const data = await fetch(`https://stackbackend-9z32.onrender.com/user/getVideo`,{
        method:'GET'
    })
    const res = await data.json()
    setvideo(res.data);
    }
    catch(err){
      console.log(err)
    }
  }
  
  useEffect(()=>{
    GetAllTweets();
    getImage();
    getVideo();
  },[])

  //Change Hidden Property
  const GotoImage = ()=>{
    let box1 = document.querySelector(".tweeeet")
    let box2 = document.querySelector(".imgggg")
    let box3 = document.querySelector(".vidddd")

    box1.classList.add("hidden")
    box3.classList.add("hidden")
    box2.classList.remove("hidden")
}
const gotoVideo = ()=>{
    let box1 = document.querySelector(".tweeeet")
    let box2 = document.querySelector(".imgggg")
    let box3 = document.querySelector(".vidddd")

    box1.classList.add("hidden")
    box2.classList.add("hidden")
    box3.classList.remove("hidden")
}
const gotoTweet = ()=>{
    let box1 = document.querySelector(".tweeeet")
    let box2 = document.querySelector(".imgggg")
    let box3 = document.querySelector(".vidddd")

    box3.classList.add("hidden")
    box2.classList.add("hidden")
    box1.classList.remove("hidden")
}
  return (
      <div>
    <div className='question-details-page'>
      <div className='main-data'>
      <div className="data">
      <h1 style={{marginBottom:"2rem", textAlign:"center"}}>Welcome to the Public Page!</h1>
      <div className="btnss">
      <button onClick={gotoTweet}>Tweet Section</button>
      <button onClick={GotoImage}>Image Section</button>
      <button onClick={gotoVideo}>Video Section</button>
      </div>
      <div className="tweeeet">
        <h1 style={{textAlign:"center"}}>Tweet Section</h1>
      {
        tweet.map((e,index)=>{
          return(
            <div className="box1" key={index}>
            <p className='messsss'>{e.tweet}</p>
          <div className="extra-Details">
          <p>Posted by -: <span className='postee'>anonymous</span ></p>
          <p>postedAt -: <span className='postee'>{e.createAt}</span></p>
          </div>
          </div>
          )
        })
      }
      </div>
      {/*
      Image Section
       */}
       <div className="imgggg hidden">
        <h1 style={{textAlign:"center"}}>Image Section</h1>
       {
        image.map((e,index)=>{
          return(
            <div className="box1" key={index}>
              <a href={e.imageUrl} target="_blank">
            <img src={e.imageUrl} alt="img" style={{width:"100%", borderRadius:"1rem"}}/>
            </a>
            <p>{e.imageCaption}</p>
          <div className="extra-Details">
          <p>Posted by -: <span className='postee'>anonymous</span ></p>
          <p>postedAt -: <span className='postee'>{e.createAt}</span></p>
          </div>
          </div>
          )
        })
       }
      </div>
         {/*
      video Section
       */}
                 <div className="vidddd hidden">
        <h1 style={{textAlign:"center"}}>Video Section</h1>
        {
        video.map((e,index)=>{
          return(
            <div className="box1" key={index}>
            <video src={e.videoUrl} alt="videoLoading" style={{width:"100%",height:"30vh",borderRadius:"1rem"}} controls />
            <p>{e.videoCaption}</p>
            <Link to={`/VideoPlayer/${encodeURIComponent(e.videoUrl)}`}>
            <button className='nav-links'>Play in Custom Video Player</button>
          </Link>
          <div className="extra-Details">
          <p>Posted by -: <span className='postee'>anonymous</span ></p>
          <p>postedAt -: <span className='postee'>{e.createAt}</span></p>
          </div>
          </div>
          )
        })
       }
      </div>
          {/*
      video Section
       */}
      </div>
      </div>
      </div>
    </div>
  )
}

export default DisplayPublicPage
