import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
    <nav className="navbar navbar-light">
    <span className="navbar-brand mb-0 h1">Administrador</span>
    </nav>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarColor03">
    <ul className="navbar-nav mr-auto">
   
      <li className="nav-item">
        <Link to={'/suscriptores'} className="nav-link" >
            Suscriptores
        </Link>
      </li>
      <li className="nav-item">
        <Link to={'/'} className="nav-link" >
            Talleres
        </Link>
      </li>
    </ul>
  </div>
</nav>
    );
}

export default Navbar;