import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Spinner from '../layout/Spinner';

class EditarTaller extends Component {
    
    // refs
    tituloInput = React.createRef();
    lugarInput = React.createRef();
    autorInput = React.createRef();
    entradasInput = React.createRef();

    // actualizar taller en firebase
    actualizarTaller = e => {
        e.preventDefault();

        //construir el nuevo objeto
        const tallerActualizado = {
            titulo: this.tituloInput.current.value,
            lugar: this.lugarInput.current.value,
            autor: this.autorInput.current.value,
            entradas: this.entradasInput.current.value,
        }
        console.log(tallerActualizado);

        //leer firestore y history
        const { firestore, history, taller } = this.props;

        // actualizar en firestore
        firestore.update({
            collection: 'talleres',
            doc: taller.id
        }, tallerActualizado)
        .then(history.push('/'))
    }

    render() {

        // agarrar el taller a editar
        const { taller } = this.props;

        if(!taller) return <Spinner />;

        return(
            <div className="row">
                <div className="col-12-mb-4">
                <Link to={'/'} className="btn btn-secondary">
                    <i className="fas fa-arrow-circle-left"></i> {''}
                    Volver al listado
                </Link>
                </div>
                <div className="col-12 mt-3">
                    <h2>
                    <i className="fas fa-book"></i> {''}
                    Editar Taller
                    </h2>
               
                <div className="row justify-content-center">
                    <div className="col-md-8 mt-5">
                        <form onSubmit={this.actualizarTaller}>
                        <div className="form-group">
                                    <label>Titulo:</label>
                                    <input 
                                        type="text"
                                        className="form-control"
                                        name="titulo"
                                        placeholder="Titulo del taller"
                                        defaultValue={taller.titulo}
                                        ref={this.tituloInput}
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
                                        defaultValue={taller.lugar}
                                        ref={this.lugarInput}
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
                                        defaultValue={taller.autor}
                                        ref={this.autorInput}
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
                                        defaultValue={taller.entradas}
                                        ref={this.entradasInput}
                                        required
                                    />
                                </div>
                                <input type="submit" value="Editar Taller"className="btn btn-success" />
                            
                        </form>
                    </div>
                </div>
                </div>
            </div>            
        );
    }
}


EditarTaller.propTypes = {
    firestore: PropTypes.object.isRequired
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
)(EditarTaller);