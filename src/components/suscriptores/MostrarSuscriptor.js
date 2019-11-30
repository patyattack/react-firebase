import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Spinner from '../layout/Spinner';
const MostrarSuscriptor = ({suscriptor}) => {
    if(!suscriptor) return <Spinner />;

    return(
        <div className="row">
            <div className="col-md-6 mb-4">
                <Link to="/suscriptores" className="btn btn-secondary">
                    <i className="fas fa-arrow-circle-left"></i> {''}
                    Volver al Listado
                </Link>
            </div>
            <div className="col-md-6">
                <Link  to={`/suscriptores/editar/${suscriptor.id}`} className="btn btn-primary float-right">
                    <i className="fas-fa-pencil-alt"></i> {''}
                    Editar Suscriptore
                </Link>
            </div>

            <hr className="mx-5 w-100" />

            <div className="col-12">
                <h2 className="mb-4">
                    {suscriptor.nombre} {suscriptor.apellido}
                </h2>
                <p>
                    <span className="font-weight-bold">Mail:</span> {''}
                    {suscriptor.mail}
                </p>
                <p>
                    <span className="font-weight-bold">Código:</span> {''}
                    {suscriptor.codigo}
                </p>
            </div>
        </div>
    );
}

MostrarSuscriptor.propTypes = {
    firestore : PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(props => [
        {
        collection: 'suscriptores',
        //como en suscriptoresJS guarda el state como suscriptores uso un alias para q no pierda la referencia
        storeAs: 'suscriptor',
        doc: props.match.params.id
        }
    ]),
    //decompongo para sacar el suscriptore desde Redux (origin suscriptoresJS)
    connect(({ firestore: { ordered }}, props ) => ({
        suscriptor: ordered.suscriptor && ordered.suscriptor[0]
    }))
)(MostrarSuscriptor);