import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AllUsers from "./Component/AllUsers/AllUsers";
import NavBar from "./Component/Navbar/Navbar";
import NotFound from "./Component/NotFound";
import EditUser from "./Component/Edit/Edit";
import Login from "./Component/Login/Login";
// import Signin from "./Component/Signin/Signin";
import Signin from "./Component/Signin/Signin";
import Profile from "./Component/Profile/Profile";
import AddAmount from "./Component/AddAmount/AddAmount";

function App() {
  return (
    <div>
      <Router>
        {/* <NavBar /> */}
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Login} />
          <Route exact path="/signin" component={Signin} />
          <Route exact path="/all/:id" component={AllUsers} />
          <Route exact path="/edit/:id" component={EditUser} />
          <Route exact path="/profile/:id" component={Profile} />
          <Route exact path="/add/:id" component={AddAmount} />

          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
