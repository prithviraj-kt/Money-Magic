import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AllUsers from "./Component/AllUsers";
import NavBar from "./Component/NavBar";
import NotFound from "./Component/NotFound";
import EditUser from "./Component/EditUser";
import Login from "./Component/Login";
import Signin from "./Component/Signin";
import Profile from "./Component/Profile";
import DisplayAccount from "./Account/DisplayAccount";
import AddAmount from "./Account/AddAmount";



function App() {

  return (
    <div>
        <Router>
          <NavBar />
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/" component={Login} />
              <Route exact path="/signin" component={Signin} />
              <Route exact path="/all/:id" component={AllUsers} />
              <Route exact path="/edit/:id" component={EditUser} />
              <Route exact path="/profile/:id" component={Profile} />
              <Route exact path="/display/:id" component={DisplayAccount} />
              <Route exact path="/add/:id" component={AddAmount} />

              <Route component={NotFound} />
            </Switch>
        </Router>
    </div>
  );
}

export default App;
