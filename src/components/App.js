import React from "react"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AuthProvider } from "../context/AuthContext";
import Signup from "./Signup"
import Home from "./Home";
import Login from "./login";
import ForgotPassword from "./ForgotPassword";
import PrivateRoute from "./PrivateRoute";
import Navbar from "./Navbar"
import UserProfile from "./UserProfile";

function App() {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <div className="container mx-auto flex justify-center items-center">
          <Router>
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Route path="/password-recovery" component={ForgotPassword} />
              <Route path="/profile" component={UserProfile} />
            </Switch>
          </Router>
        </div>
      </AuthProvider>
    </>
  )
}
export default App;
