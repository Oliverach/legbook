import React from "react"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { AuthProvider } from "../context/AuthContext";
import Signup from "./Signup"
import Dashboard from "./Dashboard";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <Route path="/signup" component={Signup}/>
          <Route path="/" component={Dashboard}/>
        </Switch>
      </AuthProvider>
    </Router>

  )
}

export default App;
