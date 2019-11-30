import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';

import Talleres from './components/talleres/Talleres';
import MostrarTaller from './components/talleres/MostrarTaller';
import NuevoTaller from './components/talleres/NuevoTaller';
import EditarTaller from './components/talleres/EditarTaller';
import PrestamoTaller from './components/talleres/PrestamoTaller';

import Suscriptores from './components/suscriptores/Suscriptores';
import MostrarSuscriptor from './components/suscriptores/MostrarSuscriptor';
import NuevoSuscriptor from './components/suscriptores/NuevoSuscriptor';
import EditarSuscriptor from './components/suscriptores/EditarSuscriptor';

import Navbar from './components/layout/Navbar';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Talleres} />
              <Route exact path="/talleres/nuevo" component={NuevoTaller} />
              <Route exact path="/talleres/mostrar/:id" component={MostrarTaller} />
              <Route exact path="/talleres/editar/:id" component={EditarTaller} />
              <Route exact path="/talleres/prestamo/:id" component={PrestamoTaller} />



              <Route exact path="/suscriptores" component={Suscriptores} />
              <Route exact path="/suscriptores/nuevo" component={NuevoSuscriptor} />
              <Route exact path="/suscriptores/mostrar/:id" component={MostrarSuscriptor} />
              <Route exact path="/suscriptores/editar/:id" component={EditarSuscriptor} />
            </Switch>
          </div>
      </Router>
    </Provider>
  );
}

export default App;
