import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

class NuevoTaller extends Component {
    state = {
        titulo: '',
        lugar: '',
        autor: '',
        entradas: ''
    }

    // guarda el taller en la db
    agregarTaller = e => {
        e.preventDefault();

        // tomar copia del state
        const nuevoTaller = this.state;

        // agregar arreglo de prestados
        nuevoTaller.prestados = [];

        // extraer firestore con sus metodos para insertar nuevo registro
        const { firestore, history } = this.props;

        //añadir a la db y redireccionar
        firestore.add({collection: 'talleres'}, nuevoTaller)
        .then(() => history.push('/'))
    }

    // almacena lo que el usuario escribe en el state
    leerDato = e => {
        this.setState({
            [e.target.name] : e.target.value,
        }); 
    }

    render(){
        return(
            <div className="row">
                <div className="col-12 mb-4">
                    <Link to='/' className="btn btn-secondary">
                        <i className="fas fa-arrow-circle-left"></i> {''}
                        Volver al listado
                    </Link>
                </div>
                <div className="col-12">
                    <h2>
                        <i className="fas fa-book"></i>{''}
                        Nuevo Taller
                    </h2>
                    <div className="row justify-content-center">
                        <div className="col-md-8 mt-5">
                            <form onSubmit={this.agregarTaller}>
                                <div className="form-group">
                                    <label>Titulo:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="titulo"
                                        placeholder="Titulo del taller"
                                        value={this.state.titulo}
                                        onChange={this.leerDato}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Lugar:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="lugar"
                                        placeholder="Lugar del taller"
                                        value={this.state.lugar}
                                        onChange={this.leerDato}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Autor:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="autor"
                                        placeholder="Autor del taller"
                                        value={this.state.autor}
                                        onChange={this.leerDato}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Entradas:</label>
                                    <input 
                                        type="number"
                                        min="0"
                                        className="form-control"
                                        name="entradas"
                                        placeholder="Cantidad de entradas"
                                        value={this.state.entradas}
                                        onChange={this.leerDato}
                                        required
                                    />
                                </div>
                                <input type="submit" value="Agregar Taller"className="btn btn-success" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

NuevoTaller.propTypes = {
    firestore: PropTypes.object.isRequired
}

export default firestoreConnect() (NuevoTaller);