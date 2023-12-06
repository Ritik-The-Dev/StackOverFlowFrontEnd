import {React,useState,useEffect} from 'react'
import './LoginHistory.css'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
const LoginHistoryPage = () => {

const [LoginInfo,setLoginInfo] = useState([]);


//Check user login or not
const User = useSelector((state) => state.currentUserReducer);
const Navigate = useNavigate();

//get Login History
  const GetLoginInfo = async ()=>{
    if (User === null) {
      Navigate("/Auth");
      return alert("Login or Signup to Check Login History");
    }
    else{
    try{
        let email = await User.result.email
        if(email !== ""){
      const data = await fetch(`https://stackbackend-9z32.onrender.com/user/getLoginHistory/${email}`,{
      method:'GET'
      })
        const res = await data.json()
        setLoginInfo(res.data);
      }
      else{
      alert("Email Should not be Empty")
      }}
  catch(err){
      console.log(err)
     }
  }}

  useEffect(()=>{
    GetLoginInfo();
  },[])
  return (
    <div>
    <div className='question-details-page'>
      <div className='main-data'>
      <div className="data">
      <h1 style={{marginBottom:"2rem", textAlign:"center"}}>Welcome to the Login History Page!</h1>
      <div className="tweeeet">
      {
        LoginInfo.map((e,index)=>{
          return(
            <div className="box1" key={index}>
            <p>System Info -: {e.SystemInfo}</p>
            <br />
            <p>IP adress -: {e.IPAdress}</p>
            <p>Login Date {e.loginAt}</p>
          </div>
          )
        })
      }
      </div>
    </div>
    </div>
    </div>
  </div>
  )
}

export default LoginHistoryPage
