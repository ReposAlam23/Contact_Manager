import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./login.css";

const Login = (props) => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const [visibility, setVisibility] = useState("password");
  const [switchIcon, setSwitchIcon] = useState(true);
  const [message, setMessage] = useState({ status: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault(e);
    if (data.password.length > 5) {
      axios
        .post("http://localhost:5500/login", data)
        .then((result) => {
          localStorage.setItem(
            "token",
            JSON.stringify(result.data.message.token)
          );
          localStorage.setItem(
            "userdetails",
            JSON.stringify(result.data.message.userdetails)
          );
          navigate("/main");
        })
        .catch((e) => {
          setMessage(e?.response?.data);
          setValid(true);
        });
    } else {
      setMessage({
        status: "Note!",
        message: "Password should be of minimum 6 charecters",
      });
      setValid(true);
    }
  };

  return (
    <React.Fragment>
      <main className="main-cont ">
        <div className="row">
          <h1 className="logo">Logo</h1>
          <p>Enter your credentials to access your account</p>
          <div className="row d-flex justify-content-around align-items-center h-100">
            <div className="col-lg-10">
              <form onSubmit={handleSubmit}>
                <div className="col-sm-12 inputBox">
                  <input
                    className="form-control m-2 px-5"
                    type="email"
                    name="email"
                    placeholder="User Id"
                    required
                    onChange={(e) =>
                      setData({ ...data, email: e.target.value })
                    }
                  />
              
                </div>

                <div className="col-sm-12 inputBox">
                  <input
                    className="form-control m-2 px-5 "
                    type={visibility}
                    name="password"
                    placeholder="Password"
                    required
                    onChange={(e) =>
                      setData({ ...data, password: e.target.value })
                    }
                  />
              
                  {switchIcon ? (
                    <VisibilityIcon
                      onClick={() => {
                        setVisibility("text");
                        setSwitchIcon(!switchIcon);
                      }}
                      className="visibility"
                    />
                  ) : (
                    <VisibilityOffIcon
                      onClick={() => {
                        setVisibility("password");
                        setSwitchIcon(!switchIcon);
                      }}
                      className="visibility"
                    />
                  )}
                </div>

                <button className="signin m-2 p-1 rounded-2">Sign In</button>
                <Link to={"/signup"}>
                  <button className="signUp m-2 p-1 rounded-2">Sign Up</button>
                </Link>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col-12"></div>
          </div>
        </div>
      </main>
    </React.Fragment>
  );
};
const Validation = (props) => {
  return props.trigger ? <div className="popupCard">{props.children}</div> : "";
};

export default Login;
