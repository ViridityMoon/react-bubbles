import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

import PrivateRoute from './components/PrivateRoute';
import BubblePage from './components/BubblePage';
import Login from "./components/Login";
import ColorList from './components/ColorList';

import "./styles.scss";

function App() {
  return (
    <Router>
      <div className="App">
      <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
        <Switch>
          <Route 
            path="/login" 
            component={Login} />
        </Switch>
        <Switch>
          <PrivateRoute 
            path="/protected" 
            component={BubblePage, ColorList}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
