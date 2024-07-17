import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {toast, Toaster} from "react-hot-toast";

let emailid, pass;

function formLogin(e) {
  const compname = e.target.name;
  if (compname == "email") {
    emailid = e.target.value;
  }

  if (compname == "pass") {
    pass = e.target.value;
  }

  data.email = emailid;
  data.password = pass;
  console.log(data);
}
const data = {
  email: "",
  password: "",
};

async function formSubmit(e) {
  try {
    const res = await axios.post("https://auth-mern1-api.vercel.app/auth/login", data);
    if (res) {
      //to store data from DB to browser
      window.localStorage.setItem(
        "uData",
        JSON.stringify({
          email: res.data.email,
          jwtToken: res.data.jwtToken,
          uname: res.data.name,
        })
      );
    await toast.success(res.data.message,{
      duration:1000
    })
      
    setTimeout(()=>{
      window.location.href = "/Home";
    },1000);
    
  }
 } catch (e) {
    toast.error(e.message);
  }
}

function Login() {
  return (
    <>
    <Toaster />
      <div className="container">
      <h1>Login</h1>
      <form>
        <label>Email: </label>
        <input type="email" name="email" value={emailid} onChange={formLogin} />

        <label>Password: </label>
        <input type="password" name="pass" value={pass} onChange={formLogin} />
      </form>

      <button
        onClick={formSubmit}
        style={{ width: "240px", height: "50px", margin: "20px" }}
      >
        Login
        
      </button>
      <span>
        Does't have an account?
        <Link to="/signup">Signup</Link>
      </span>
    </div>
    </>
  );
}

export default Login;
