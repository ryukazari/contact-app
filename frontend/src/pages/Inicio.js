import React, { Fragment, useEffect, useState } from 'react';
import Navigation from '../components/Navigation';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Contacto from './Contacto';
import FormularioContacto from './FormularioContacto';

const Inicio = () => {
    return(
        <Router>
            <Navigation/>
                <div className="container p-4">
                    <Route path="/contactos" exact component={Contacto}></Route>
                    <Route path="/contactos/crear" exact component={FormularioContacto}></Route>
                    <Route path="/contactos/editar/:id" exact component={FormularioContacto}></Route>
                </div>
        </Router>
    )
}

export default Inicio;