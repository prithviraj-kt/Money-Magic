import React from "react";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import "../Assets/Css/AllUsers.css";
import firebaseDb from "../firebase";

import {
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from "@material-ui/core";

function AllUsers() {
  const auth = localStorage.getItem("id");
  const history = useHistory();

  const {id} = useParams();
  const [users, setUsers] = useState();

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const userRef = firebaseDb.database().ref("Contacts");

    userRef.on("value", (snapshot) => {
      const user = snapshot.val();
      const userList = [];
      for (let id in user) {
        userList.push({ id, ...user[id] });
      }
      setUsers(userList);
    });
  };
  const deleteUserData = async (ID) => {
    const userRef = firebaseDb.database().ref(`Contacts/${ID}`);
    userRef.on("value", (snapshot) => {
      console.log(snapshot.val());
    });
    userRef.remove();
  };

  const displayUsers = (user) => {
    return (
      <TableRow>
        <TableCell>{user._ID}</TableCell>
        <TableCell>{user.name}</TableCell>
        {/* <TableCell>{user.usn}</TableCell> */}
        <TableCell>{user.username}</TableCell>
        <TableCell>{user.email}</TableCell>
        {/* <TableCell>
          <Button variant="contained" component={Link} to={`/edit/${user._ID}`}>
            Edit
          </Button>
          <Button variant="contained" onClick={() => deleteUserData(user._ID)}>
            Delete
          </Button>
        </TableCell> */}
      </TableRow>
    );
  };

  if (auth === id) {
    return (
      <div className="allUser">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>NAME</TableCell>
              {/* <TableCell>USN</TableCell> */}
              <TableCell>USER NAME</TableCell>
              <TableCell>EMAIL</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users ? users.map(displayUsers) : "No users to display..."}
          </TableBody>
        </Table>
      </div>
    );
  } else{
    return(
      <div>
        {
          history.push("/login")
        }
      </div>
    );
  }
}

export default AllUsers;
