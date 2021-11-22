import { AppBar, Toolbar, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import "../Assets/Css/Navbar.css";
const useStyles = makeStyles({
  header: {
    background: "#111111",
  },
  tabs: {
    color: "#ffffff",
    textDecoration: "none",
    margin: "10px",
    fontSize: "20px",
  },
});
function NavBar() {
    const {id} = useParams();
  const classes = useStyles();
  const history = useHistory();

  const handleLoginClick = () => {
    history.push("/login");
  };

  const handleSigninClick = () => {
    history.push("/signin");
  };

  const auth = localStorage.getItem('id')
  const handleUserClick = () => {
      if(auth || id){
          history.push(`/all/${auth}`);
      }else{
          alert("Please login")
          history.push('/login');
      }
  };

  const handleLogoutClick = () => {
    localStorage.clear();
    history.push("/login")
  }

  const handleProfileClick =() => {
    if(auth || id){
        history.push(`/profile/${auth}`)
    }else{
        alert("Please login")
        history.push('/login');
    }
  }

  const handleAddClick =() => {
    if(auth || id){
        history.push(`/add/${auth}`)
    }else{
        alert("Please login")
        history.push('/login');
    }
  }
  const handleDisplayClick =() => {
    if(auth || id){
        history.push(`/display/${auth}`)
    }else{
        alert("Please login")
        history.push('/login');
    }
  }

  return (
    <div>
      <AppBar className={classes.header} position="static">
        <Toolbar className="navbarNav">
          <div>
            <Typography>Contact Book</Typography>
          </div>
          <div className="navbarButton">
            <button onClick={() => handleLoginClick()}>Login</button>
            <button onClick={() => handleSigninClick()}>Sign in</button>
            <button onClick={() => handleUserClick()}>All users</button>
            <button onClick={() => handleAddClick()}>Add Amount</button>
            <button onClick={() => handleDisplayClick()}>Display transactions</button>
            <button onClick={() => handleLogoutClick()}>Log out</button>
            <button onClick={() => handleProfileClick()}>Profile</button>

          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
