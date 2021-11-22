import React, { useState, useEffect } from "react";
import firebaseDb from "../firebase";
import { useHistory, useParams } from "react-router-dom";
import "../Assets/Css/Login.css";
const initialValues = {
  _ID: "",
  password: "",
};

function Login() {
  const [users, setUsers] = useState();
  
  const history = useHistory();
  const [user, setUser] = useState(initialValues);
  const {_ID, password} = user;
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  useEffect(() => {
      getUserData();
  }, [user])

  const getUserData = async () => {
      try {
          const userRef = await firebaseDb.database().ref(`Contacts/${_ID}`);
          userRef.on("value", (snapshot) => {
            setUsers(snapshot.val());
          });
      } catch (error) {
          alert("Rrror occured")
      }
  };

  const handleSubmit = () => {
      if(users._ID == user._ID && users.password == user.password){
          localStorage.setItem('password',user.password);
          localStorage.setItem('id',user._ID);

          alert("Login successful");
          history.push(`/all/${_ID}`);
        }else{
          alert("Login failed");
      }
  };

  return (
    <div className="login">
      <h1>LOGIN</h1>
      <form className="loginForm">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">
            <h4>ID</h4>
          </label>
          <input
            name="_ID"
            type="text"
            class="form-control loginInput"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => handleChange(e)}
          />
          {/* <div id="emailHelp" class="form-text">
            We'll never share your info with anyone else.
          </div> */}
        </div>
        <div class="mb-3 loginPassword">
          <label for="exampleInputPassword1" class="form-label">
            <h5>Password</h5>
          </label>
          <input
            name="password"
            type="password"
            class="form-control loginInput"
            id="exampleInputPassword1"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button
          onClick={() => handleSubmit()}
          class="btn btn-primary"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
