import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import signin from "./signin.png";
import firebaseDb from "../../firebase";

import "./Sign.css";
const initialValues = {
  _ID: "",
  name: "",
  password: "",
  cpassword: "",
  username: "",
  email: "",
};
function Signin() {
  const [user, setUser] = useState(initialValues);
  const [exist, setExist] = useState(initialValues);

  const { _ID, name, password, cpassword, username, email } = user;
  const history = useHistory();
  useEffect(() => {
    loadUserDetails();
  }, [user]);

  const loadUserDetails = async () => {
    try {
      const userRef = await firebaseDb.database().ref(`Contacts/${_ID}`);
      userRef.on("value", (snapshot) => {
        console.log(snapshot.val());
        setExist(snapshot.val());
      });
      // if(exist._ID){

      //   alert("User exists")
      // }
    } catch (error) {
      alert("error while load user");
    }
  };

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  const addUserDetails = async () => {
    if (
      _ID != "" &&
      password != "" &&
      cpassword != "" &&
      name != "" &&
      username != "" &&
      email != ""
    ) {
      if (password == cpassword) {
        try {
          const existingUser = await firebaseDb
            .database()
            .ref(`Contacts/${_ID}`);
          existingUser.on("value", async (snap) => {
            if (snap.val()) {
              setUser(initialValues);
              // alert("User already exists")
            } else {
              await existingUser.set(user);
              setUser(initialValues);
              alert("Please login");
              history.push(`/login`);
            }
          });
        } catch (error) {
          alert("Some erroe occured... Please try again later");
        }
      } else {
        alert("Password did not match, please try again...");
        setUser(initialValues);
      }
    } else {
      alert("Please enter complete details");
    }
  };

  const goToLogin = () => {
    history.push("/login");
  };
  return (
    <div className="Signin">
      <div className="container signinContainer">
        <div className="row signinRow">
          <div className="col-md-5 signinLeft">
            <img src={signin} alt="" />
          </div>
          <div className="col-md-7 signinRight">
            <div className="row signinRightTitle">
              <div className="signinNames">
                <h3>Money Magic</h3>
                <h2>Welcome to fam!</h2>
                <p>
                  Already a customer?
                  <span className="signinLogin">
                    {" "}
                    <button onClick={goToLogin}> Let's login </button>
                  </span>
                </p>
              </div>
            </div>
            <div className="row signinRightInput">
              <input
                type="number"
                placeholder="User Id"
                onChange={(e) => onValueChange(e)}
                name="_ID"
                value={_ID}
              />
              <input
                placeholder="First Name"
                onChange={(e) => onValueChange(e)}
                name="name"
                value={name}
              />
              <input
                placeholder="Last Name"
                onChange={(e) => onValueChange(e)}
                name="username"
                value={username}
              />
              <input
                placeholder="Password"
                type="password"
                onChange={(e) => onValueChange(e)}
                name="password"
                value={password}
              />
              <input
                placeholder="Confirm Password"
                type="password"
                onChange={(e) => onValueChange(e)}
                name="cpassword"
                value={cpassword}
              />
              <input
                type="email"
                placeholder="Email-Id"
                onChange={(e) => onValueChange(e)}
                name="email"
                value={email}
              />
            </div>
            <div className="row signinRightSubmit">
              <button onClick={() => addUserDetails()}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
