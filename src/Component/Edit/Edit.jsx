import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import firebaseDb from "../../firebase";
import "./Edit.css";
const initialValue = {
  name: "",
  _ID: "",
  username: "",
  email: "",
  password: "",
  cpassword:"",
};
function Edit() {
  const [user, setUser] = useState(initialValue);
  const { id } = useParams();
  let history = useHistory();

  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    const userRef = await firebaseDb.database().ref(`Contacts/${id}`);
    userRef.on("value", (snapshot) => {
      console.log(snapshot.val());
      setUser(snapshot.val());
    });
  };

  const editUserDetails = async () => {
    if(user.password == user.cpassword){

      console.log(user);
      const todoRef = firebaseDb.database().ref(`Contacts/${id}`);
      todoRef.update(user);
      history.push(`/profile/${id}`);
    } else {
      alert("Password incorrect")
    }
  };

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  return (
    <div>
      <div className="Signin">
        <div className="container signinContainer">
          <div className="row signinRow">

            <div className="col-md-7 signinRight">
              <div className="row signinRightTitle">
                <div className="signinNames">
                  <h3>Money Magic</h3>
                  <h2>Welcome to fam!</h2>
                </div>
              </div>
              <div className="row signinRightInput">
                <input
                  onChange={(e) => onValueChange(e)}
                  name="name"
                  value={user.name}
                  id="my-input"
                  aria-describedby="my-helper-text"
                />
                <input
                  onChange={(e) => onValueChange(e)}
                  name="username"
                  value={user.username}
                  id="my-input"
                  aria-describedby="my-helper-text"
                />
                <input
                  onChange={(e) => onValueChange(e)}
                  name="email"
                  value={user.email}
                  id="my-input"
                  aria-describedby="my-helper-text"
                />
                <input
                  onChange={(e) => onValueChange(e)}
                  name="password"
                  value={user.password}
                  id="my-input"
                  aria-describedby="my-helper-text"
                />
                <input
                  onChange={(e) => onValueChange(e)}
                  name="cpassword"
                  value={user.cpassword}
                  id="my-input"
                  aria-describedby="my-helper-text"
                />
                {/* <input
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
                /> */}
              </div>
              <div className="row signinRightSubmit">
                {/* <button onClick={() => addUserDetails()}>Submit</button> */}
                <button
                  variant="contained"
                  color="primary"
                  onClick={() => editUserDetails()}
                >
                  Edit User
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Edit;
