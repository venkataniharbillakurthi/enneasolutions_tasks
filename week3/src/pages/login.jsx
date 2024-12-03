import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";


const Login = () => {
  const navigate = useNavigate();
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const myfun = () => {
    // Safely access the ref values
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    if (username === "admin" && password === "admin") {
      navigate("/"); // Navigate to Home page
    } else {
      alert("Invalid Credentials");
    }
  };

  const skip = () => {
    navigate("/"); // Navigate to Home page
  };

  return (
    <div className="loginmain">
       
        
    <div className="login">
      <div className="loginbox">
        <p onClick={skip} style={{ cursor: "pointer" }}>Skip</p>
        <h2>LOGIN</h2>
        <br />
        <label htmlFor="username">USER NAME</label>
        <input type="text" id="username" ref={usernameRef} />
        <br />
        <br />
        <label htmlFor="password">PASSWORD</label>
        <input type="password" name="password" id="password" ref={passwordRef} />
        <br />
        <br />
        <center>
          <button onClick={myfun}>Login</button>
        </center>
      </div>
    </div>
 
    </div>
  );
};

export default Login;
