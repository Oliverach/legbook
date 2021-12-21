import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { AuthProvider } from "../context/AuthContext"
import { ContentProvider } from "../context/ContentContext"
import Signup from "./Signup"
import Home from "./Home"
import Login from "./Login"
import ForgotPassword from "./ForgotPassword"
import PrivateRoute from "./PrivateRoute"
import Navbar from "./Navbar"
import Profile from "./Profile"

function App() {
  return (
    <>
      <AuthProvider>
        <ContentProvider>
          <Navbar />
          <div className="container mx-auto">
            <Router>
              <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <Route path="/signup" component={Signup} />
                <Route path="/login" component={Login} />
                <Route path="/password-recovery" component={ForgotPassword} />
                <Route path="/profile" component={Profile} />
              </Switch>
            </Router>
          </div>
        </ContentProvider>
      </AuthProvider>
    </>
  )
}
export default App
