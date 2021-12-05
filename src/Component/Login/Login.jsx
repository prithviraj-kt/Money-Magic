import React, { useState, useEffect } from "react";
import "./Login.css";
import firebaseDb from "../../firebase";
import { useHistory, useParams } from "react-router-dom";
import login from "./login.jpg";
const initialValues = {
  _ID: "",
  password: "",
};
function Login() {
  const [users, setUsers] = useState();

  const history = useHistory();
  const [user, setUser] = useState(initialValues);
  const { _ID, password } = user;
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  useEffect(() => {
    getUserData();
  }, [user]);

  const getUserData = async () => {
    try {
      const userRef = await firebaseDb.database().ref(`Contacts/${_ID}`);
      userRef.on("value", (snapshot) => {
        setUsers(snapshot.val());
      });
    } catch (error) {
      alert("Rrror occured");
    }
  };

  const handleSubmit = () => {
    try {
      if (users._ID == user._ID && users.password == user.password) {
        localStorage.setItem("password", user.password);
        localStorage.setItem("id", user._ID);
        alert("Login successful");
        history.push(`/all/${_ID}`);
      }
    } catch (err) {
      alert("Please enter right details");
    }
  };

  const goToSignin = () => {
    history.push("/signin");
  };
  return (
    <div className="Login">
      <div className="container-fluid loginOuter">
        <div className="container loginInner">
          <div className="row">
            <div className="col-lg-5 loginLeft">
              <div className="row loginLeftContents">
                <div className="row loginLabels">
                  <h1 className="loginText">Login</h1>
                </div>
                <div className="row loginLabels">
                  <p>
                    New User?{" "}
                    <span className="loginSignin">
                      {" "}
                      <button onClick={goToSignin}> Sign in </button>
                    </span>
                  </p>
                </div>
                <div className="row loginLabels">
                  <h2 className="loginUser_ID">User-id</h2>
                  <input
                    name="_ID"
                    type="text"
                    className="form-control loginInput"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    onChange={(e) => handleChange(e)}
                  />{" "}
                </div>
                <div className="row loginLabels">
                  <h2 className="loginUser_ID">Password</h2>
                  <input
                    name="password"
                    type="password"
                    className="form-control loginInput"
                    id="exampleInputPassword1"
                    onChange={(e) => handleChange(e)}
                  />{" "}
                </div>
                <div className="row loginLabels">
                  <button
                    onClick={() => handleSubmit()}
                    className="btn loginButton"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="row loginImage">
                <img src={login} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
