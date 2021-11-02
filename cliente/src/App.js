import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from 'reactstrap';
import React, { useState, useEffect } from "react";
import './App.css';
import UserContext from './context/UserContext';
import RegisterForm from './components/registro/RegisterForm';
import Perfil from "./components/perfil/Perfil";

function App() {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('USER_DATA')));

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Container>
          <Switch>
            < Route exact path="/">
              <RegisterForm />
            </Route>
            < Route exact path="/perfil">
              <Perfil />
            </Route>
          </Switch>
        </Container>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
