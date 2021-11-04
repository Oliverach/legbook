import React from "react"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AuthProvider } from "../context/AuthContext";
import Signup from "./Signup"
import Dashboard from "./Dashboard";
import Login from "./login";
import ForgotPassword from "./ForgotPassword";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/password-recovery" component={ForgotPassword} />
        </Switch>
      </AuthProvider>
    </Router>
  )
}
export default App;
