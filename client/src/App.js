import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import styled from "styled-components";

import Login from "./components/Login";
import Home from "./components/Home";

const Wrapper = styled.div`
  background-color: lightgray;
  display: flex;
  flex: 1;
  height: 100vh;
  padding: 50px;
  justify-content: center;
  align-items: center;
`;

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem("token") ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}

const App = () => {
  return (
    <Router>
      <Wrapper>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <PrivateRoute path="/home">
            <Home />
          </PrivateRoute>
          <Route path="/*">
            <Login />
          </Route>
        </Switch>
      </Wrapper>
    </Router>
  );
};

export default App;
