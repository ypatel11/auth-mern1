import React from "react";
import { Link } from "react-router-dom";
import {toast, Toaster} from "react-hot-toast";

function userLogout() {
  window.localStorage.removeItem("uData");
  toast.success('Logout Successfully',{
    duration:1000
  })

  setTimeout(()=>{
    window.location.href='/Login'
  },1000)
}

function Home() {
  
  const userData = JSON.parse(window.localStorage.getItem("uData"));
  // console.log(userData);

  if (userData == null) {
    return (
      <>
        <div className="container">
          <h1>User Not Logged In.</h1>

          <button
            style={{ marginLeft: "30px", width: "200px", marginTop: "30px" }}
          >
            Login
          </button>
        </div>
      </>
    );
  } else {
    return (
      <>
      <Toaster/>
      <div className="container">
        <h1>Home</h1>
        <h1>WelCome</h1>
        <br />
        <h2>{userData.uname}</h2>
        <button onClick={userLogout}>
          Logout
          
        </button>
      </div>
      </>
    );
  }
}

export default Home;
