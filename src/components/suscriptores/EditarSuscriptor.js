import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Spinner from '../layout/Spinner';

class EditarSuscriptor extends Component {

    // crear los refs
    nombreInput = React.createRef();
    apellidoInput = React.createRef();
    mailInput = React.createRef();
    codigoInput = React.createRef();

    // editar suscriptore en db
    editarSuscriptor = e => {
        e.preventDefault();

        //crear el objeto que va a actualizar
        const suscriptorActualizade = {
            nombre: this.nombreInput.current.value,
            apellido: this.apellidoInput.current.value,
            mail: this.mailInput.current.value,
            codigo: this.codigoInput.current.value,
        };
        console.log(suscriptorActualizade);

        //extraer firestore, history y suscriptore. Para ver lo que hay en suscriptore abrir RDT elegir el componente y ver props
        const {firestore, history, suscriptor} = this.props;

        //almacenar en la db de firestore
        firestore.update({
            collection: 'suscriptores',
            doc: suscriptor.id
        }, suscriptorActualizade)
        .then(history.push('/suscriptores'));
    }

    render(){
        const { suscriptor } = this.props;

        if(!suscriptor) return <Spinner />;

        return(
            <div className="row">
            <div className="col-12-mb-4">
                <Link to={'/suscriptores'} className="btn btn-secondary">
                    <i className="fas fa-arrow-circle-left"></i> {''}
                    Volver al listado
                </Link>
            </div>
            <div className="col-12 mt-3">
                <h2>
                    <i className="fas fa-user"></i> {''}
                    Editar Suscriptore
                </h2>
                <div className="row justify-content-center">
                    <div className="col-md-8 mt-5">
                        <form
                            onSubmit={this.editarSuscriptor}
                        >
                            <div className="form-group">
                                <label>Nombre:</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="nombre"
                                    placeholder="Nombre del suscriptore"
                                    ref={this.nombreInput}
                                    defaultValue={suscriptor.nombre}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Apellido:</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="apellido"
                                    placeholder="Apellido del suscriptore"
                                    ref={this.apellidoInput}
                                    defaultValue={suscriptor.apellido}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Mail:</label>
                                <input 
                                    type="email"
                                    className="form-control"
                                    name="mail"
                                    placeholder="Mail del suscriptore"
                                    ref={this.mailInput}
                                    defaultValue={suscriptor.mail}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Codigo:</label>
                                <input 
                                    type="text"
                                    className="form-control"
                                    name="codigo"
                                    placeholder="Codigo del suscriptore"
                                    ref={this.codigoInput}
                                    defaultValue={suscriptor.codigo}
                                    required
                                />
                            </div>
                            <input 
                                type="submit"
                                value="Editar Suscriptore"
                                className="btn btn-success"
                            
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

EditarSuscriptor.propTypes = {
    firestore: PropTypes.object.isRequired
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
)(EditarSuscriptor);