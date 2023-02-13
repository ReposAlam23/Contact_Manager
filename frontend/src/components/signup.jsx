import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";
import { Link } from "react-router-dom";


const Signup = (props) => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [confirmPassword, setCofirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (confirmPassword === data.password) {
      if (data.password.length < 6) {
        setMessage({
          status: "Note!",
          message: "Password should be of minimum 6 charecters",
        });
      } else {
        axios
          .post("http://localhost:5500/register", data)
          .then((result) => {
            navigate("/");
          })
          .catch((e) => {
            setMessage(e?.response?.data);
          });
      }
    } else {
      setMessage({
        status: "Note!",
        message: "Password and Confirm Password doesn't matched",
      });
    }
  };
  return (
    <React.Fragment>
      <main className="main-cont">
        
          <h1 className="logo">Logo</h1>

          <p>Create A New Account </p>

          <div className="row d-flex justify-content-around align-items-center h-100">
            <form onSubmit={handleSubmit}>
              <div className="col-sm-12 inputBox">
                <input className="form-control m-2 px-5" type="email" name="email" placeholder="User Id"
                  required
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
            
              </div>
              <div className="col-sm-12 inputBox">
                <input className="form-control m-2 px-5" type="password" name="password" placeholder="Password" required onChange={(e) => setData({ ...data, password: e.target.value }) }/>
              
              </div>
              <div className="col-sm-12 inputBox">
                <input className="form-control m-2 px-5" type="password" name="confirmPassword" placeholder="Confirm Password" required onChange={(e) => setCofirmPassword(e.target.value)} />
               
              </div>
              <button className="signin m-2 p-1 rounded-2">Sign Up</button>
              <Link to={"/"}>
                <button className="signUp m-2 p-1 rounded-2">Sign In</button>
              </Link>
            </form>
          </div>

      </main>
    </React.Fragment>
  );
};

export default Signup;
