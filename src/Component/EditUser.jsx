import { useState, useEffect } from "react";
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Button,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useHistory, useParams } from "react-router-dom";
import firebaseDb from "../firebase";

const initialValue = {
  name: "",
  _ID: "",
  username: "",
  email: "",
};

const useStyles = makeStyles({
  container: {
    width: "70%",
    margin: "5% 0 0 25%",
    "& > *": {
      marginTop: 20,
    },
  },
});
const EditUser = () => {
  const [user, setUser] = useState(initialValue);
  const { id } = useParams();
  const classes = useStyles();
  let history = useHistory();

  useEffect(() => {
    loadUserDetails();
  }, []);

  const loadUserDetails = async () => {
    const userRef = await firebaseDb.database().ref(`Contacts/${id}`);
    userRef.on("value", (snapshot) => {
      console.log(snapshot.val())
      setUser(snapshot.val());
    });
  };

  const editUserDetails = async () => {
    console.log(user);
    const todoRef = firebaseDb.database().ref(`Contacts/${id}`);
    todoRef.update(user);
    history.push(`/profile/${id}`);
  };

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  return (
    <FormGroup className={classes.container}>
      <Typography variant="h4">Edit Information</Typography>
      <FormControl>
        <InputLabel htmlFor="my-input">Name</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="name"
          value={user.name}
          id="my-input"
          aria-describedby="my-helper-text"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Username</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="username"
          value={user.username}
          id="my-input"
          aria-describedby="my-helper-text"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Email</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="email"
          value={user.email}
          id="my-input"
          aria-describedby="my-helper-text"
        />
      </FormControl>
      <FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={() => editUserDetails()}
        >
          Edit User
        </Button>
      </FormControl>
    </FormGroup>
  );
};
export default EditUser;