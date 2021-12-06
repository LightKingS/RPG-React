import React, { useState } from 'react'
import "bootswatch/dist/darkly/bootstrap.min.css";
import Header from "./Header";
import Listagem from "./Listagem";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import UserLogin from "./UserLogin";
import Grafico from './Grafico';
import Pesq from './Pesq';
import { ClienteContext } from "./ClienteContext";

function App() {

  const [dados, setDados] = useState({})

  return (
    <ClienteContext.Provider value={{dados, setDados}}>
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact>
            <Listagem />
          </Route>
          <Route path="/login">
            <UserLogin />
          </Route>
          <Route path="/graph1">
            <Grafico />
          </Route>
        </Switch>
      </Router>
    </ClienteContext.Provider>
  );
}

export default App;
