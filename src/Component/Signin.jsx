import React, { useEffect } from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
} from "@material-ui/core";
import { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import "../Assets/Css/AddUser.css";
import firebaseDb from "../firebase";
import "../Assets/Css/Signin.css";

const initialValues = {
  _ID: "",
  name: "",
  password: "",
  cpassword: "",
  username: "",
  email: "",
};

function AddUser() {
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
    } catch (error) {
      alert("error while load user");
    }
  };

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  const addUserDetails = async () => {
    if (password == cpassword) {
      try {
        const existingUser = await firebaseDb.database().ref(`Contacts/${_ID}`);
        existingUser.on("value", async (snap) => {
          if (snap.val()) {
            setUser(initialValues);
          } else {
            await existingUser.set(user);
            alert("Please login");
            history.push(`/login`);
          }
        });
      } catch (error) {
        alert("Some erroe occured... Please try again later");
      }
    }else{
      alert("Password did not match, please try again...");
      setUser(initialValues)
    }
  };

  return (
    <div className="login">
      <h1>Add User</h1>
      <FormGroup className="addUser loginForm">
        <FormControl>
          <InputLabel>ID</InputLabel>
          <Input onChange={(e) => onValueChange(e)} name="_ID" value={_ID} />
        </FormControl>
        <FormControl>
          <InputLabel>Name</InputLabel>
          <Input
            className="signinInput"
            onChange={(e) => onValueChange(e)}
            name="name"
            value={name}
          />
        </FormControl>
        <FormControl>
          <InputLabel>username</InputLabel>
          <Input
                      className="signinInput"

            onChange={(e) => onValueChange(e)}
            name="username"
            value={username}
          />
        </FormControl>
        <FormControl>
          <InputLabel>Password</InputLabel>
          <Input
                      className="signinInput"

            type="password"
            onChange={(e) => onValueChange(e)}
            name="password"
            value={password}
          />
        </FormControl>
        <FormControl>
          <InputLabel>Confirm Password</InputLabel>
          <Input
                      className="signinInput"

            type="password"
            onChange={(e) => onValueChange(e)}
            name="cpassword"
            value={cpassword}
          />
        </FormControl>
        <FormControl>
          <InputLabel>email</InputLabel>
          <Input
                      className="signinInput"

            onChange={(e) => onValueChange(e)}
            name="email"
            value={email}
          />
        </FormControl>
        <button
          onClick={() => addUserDetails()}
          class="btn btn-primary signinButton"
        >
          Submit
        </button>
      </FormGroup>
    </div>
  );
}

export default AddUser;
