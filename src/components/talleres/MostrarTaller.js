import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Spinner from '../layout/Spinner';

class MostrarTaller extends Component {
    state = {}
    render(){
        // extraer taller
        const { taller } = this.props;

        if(!taller) return <Spinner />;

        // boton para solicitar taller
        let botonPrestamo;
        if(taller.entradas - taller.prestados.length > 0){
            botonPrestamo = <Link to={`/talleres/prestamo/${taller.id}`}
                            className="btn btn-success my-3">Solicitar Prestamo</Link>
        } else {
            botonPrestamo = null;
        }
        return(
            <div className="row">
                <div className="col-md-6 mb-4">
                    <Link to="/" className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i>{''}
                        Volver al listado
                    </Link>
                </div>
                <div className="col-md-6 mb-4">
                    <Link to={`/talleres/editar/${taller.id}`} className="btn btn-primary float-right">
                        <i className="fas fa-pencil-alt"></i>{''}
                        Editar taller
                    </Link>
                </div>
                <hr className="mx-5 w-100"/>
                <div className="col-12">
                    <h2 className="mb-4">
                        {taller.titulo}
                    </h2>
                    <p>
                        <span className="font-weight-bold">
                            Lugar:
                        </span> {''}
                            {taller.lugar}
                    </p>
                    <p>
                        <span className="font-weight-bold">
                            Autor:
                        </span> {''}
                            {taller.autor}
                    </p>
                    <p>
                        <span className="font-weight-bold">
                            Entradas:
                        </span> {''}
                            {taller.entradas}
                    </p>
                    <p>
                        <span className="font-weight-bold">
                            Disponibles:
                        </span> {''}
                        {taller.entradas - taller.prestados.length}
                    </p>

                    {/* Boton para solicitar prestamo */}
                    {botonPrestamo}
                </div>
            </div>
        );
    }
}

MostrarTaller.propTypes = {
    firestore : PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(props => [
        {
        collection: 'talleres',
        //como en suscriptoresJS guarda el state como suscriptores uso un alias para q no pierda la referencia
        storeAs: 'taller',
        doc: props.match.params.id
        }
    ]),
    //decompongo para sacar el suscriptore desde Redux (origin suscriptoresJS)
    connect(({ firestore: { ordered }}, props ) => ({
        taller: ordered.taller && ordered.taller[0]
    }))
)(MostrarTaller);