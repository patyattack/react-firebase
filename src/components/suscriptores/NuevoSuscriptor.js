import React, { Component  } from 'react';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

class NuevoSuscriptor extends Component {
    state = {
        nombre: '',
        apellido: '',
        mail: '',
        codigo: ''
    };

    // envia el form, agregar suscriptore a DB
    agregarSuscriptor = e => {
        e.preventDefault();

        // extraer valores del state
        const nuevoSuscriptor = this.state;
        console.log(nuevoSuscriptor);
        
        // extraer firestore de props
        const { firestore, history } = this.props;
        console.log(this.props.firestore);

        // guardarlos en la db
        firestore.add({ collection: 'suscriptores' }, nuevoSuscriptor)
        .then(() => history.push('/suscriptores'))
    }

    // extraer value input y poner en state
    leerDato = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    render() {
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
                        <i className="fas fa-user-plus"></i> {''}
                        Nuevo Suscriptore
                    </h2>
                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form
                                onSubmit={this.agregarSuscriptor}
                            >
                                <div className="form-group">
                                    <label>Nombre:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="nombre"
                                        placeholder="Nombre del suscriptore"
                                        onChange={this.leerDato}
                                        value={this.state.nombre}
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
                                        onChange={this.leerDato}
                                        value={this.state.apellido}
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
                                        onChange={this.leerDato}
                                        value={this.state.mail}
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
                                        onChange={this.leerDato}
                                        value={this.state.codigo}
                                        required
                                    />
                                </div>
                                <input 
                                    type="submit"
                                    value="Agregar Suscriptore"
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

NuevoSuscriptor.propTypes = {
    firestore: PropTypes.object.isRequired
}

export default firestoreConnect() (NuevoSuscriptor);