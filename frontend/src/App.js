import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Contacto from './pages/Contacto';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Inicio from './pages/Inicio';
import FormularioContacto from './pages/FormularioContacto';
import { ApiProvider } from './context/ApiContext';

function App() {
  return (
    <ApiProvider>
      <BrowserRouter>
          <Switch>
            <Route path="/" component={Register} exact></Route>
            <Route path="/login" exact component={Login}></Route>
            <Route path="/contactos" exact component={Inicio}></Route>
            <Route path="/contactos/crear" exact component={Inicio}></Route>
            <Route path="/contactos/editar/:id" exact component={Inicio}></Route>
          </Switch>
      </BrowserRouter>
    </ApiProvider>
  );
}

export default App;
