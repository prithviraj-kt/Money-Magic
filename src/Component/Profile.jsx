import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import firebaseDb from "../firebase";
const initialValue = {
  name: "",
  _ID: "",
  username: "",
  email: "",
};
function Kleit() {
  const { id } = useParams();
  const [user, setUser] = useState(initialValue);

  const history = useHistory();
  const auth = localStorage.getItem("id");
  useEffect(() => {
    loadUserDetails();
  }, []);

//   const deleteUserData = async () => {
//     const userRef = await firebaseDb.database().ref(`Contacts/${id}`);
//     userRef.remove();
//     localStorage.clear();
//     history.push("/signin");
//   };

const deleteUserData = async () => {
    const userRef = firebaseDb.database().ref(`Contacts/${id}`);
    userRef.remove();
    localStorage.clear();
    history.push("/login");
  };

  const loadUserDetails = async () => {
    const userRef = await firebaseDb.database().ref(`Contacts/${id}`);
    userRef.on("value", (snapshot) => {
      setUser(snapshot.val());
    });
  };

  const handleClick =() =>{
      history.push(`/edit/${id}`)
  }

  if (id == auth) {
    return (
      <div>
        <div className="container">
          <div className="row">
            <h1>Hello , {user.name}... Welcome back</h1>
          </div>
          <div className="row">
          <table class="table table-dark table-striped">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">{user.name}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Username</td>
                <td>{user.username}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{user.email}</td>
              </tr>
            </tbody>
          </table>
          <button onClick={() => handleClick()}>
            Edit
          </button>
          <button onClick={() => deleteUserData()}>
            Delete
          </button>
        </div>
        </div>
      </div>
    );
  } else {
    return <div>{history.push("/login")}</div>;
  }
}

export default Kleit;
