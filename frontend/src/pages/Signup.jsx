import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {toast, Toaster} from "react-hot-toast";


let pass, emailid, uname;

function handleForm(e) {
  const compname = e.target.name;

  if (compname == "name") {
    uname = e.target.value;
  }
  if (compname == "email") {
    emailid = e.target.value;
  }
  if (compname == "pass") {
    pass = e.target.value;
  }

  data.name = uname;
  data.email = emailid;
  data.password = pass;  
}

const data = {
  name: "",
  email: "",
  password: "",
};

async function handleSubmit() {
  // axios.post(
  //     "http://localhost:1107/auth/signup",
  //     data
  // ).then(console.log("success")).catch(console.log("error"))
  try {
    const res = await axios.post("https://auth-mern1-api.vercel.app/auth/signup", data);

    if (res) {
      toast.success(res.data.message);
    }
  } catch (e) {
    toast.error(e.message);
  }
}

function Signup() {
  return (
    <>
    <Toaster/> 
    <div className="container">
      <h1>Signup</h1>
      <form>
        <label>Name: </label>
        <input type="text" name="name" value={uname} onChange={handleForm} />

        <label>Email: </label>
        <input
          type="email"
          name="email"
          value={emailid}
          onChange={handleForm}
        />

        <label>Password: </label>
        <input type="password" name="pass" value={pass} onChange={handleForm} />
      </form>
      <button
        onClick={handleSubmit}
        style={{ width: "240px", height: "50px", margin: "20px" }}
      >
        Submit
      </button>
      <span>
        Already have an account?
        <Link to="/login">Login</Link>
      </span>
    </div>
    </>
  );
}

export default Signup;
