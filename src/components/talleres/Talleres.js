import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Spinner from '../layout/Spinner';

const Talleres = ({talleres, firestore}) => {
    const eliminarTaller = id => {
        // eliminar libro de firestore
        firestore.delete({
            collection: 'talleres',
            doc: id
        });
    }

    if(!talleres) return <Spinner />;

    return(
      <div className="row">
          <div className="col-12 mb-4">
              <Link to="/talleres/nuevo" className="btn btn-success">
                  <i className="fas-fa-plus"></i> {''}
                  Nuevo Taller
              </Link>
          </div>
          <div className="col-md-8">
              <h2>
                  <i className="fas fa-book"></i> {''}
                  Tallers
              </h2>
          </div>
          <table className="table table-striped mt-4">
              <thead className="text-light bg-primary">
                  <tr>
                      <th>Titulo</th>
                      <th>Lugar</th>
                      <th>Autor</th>
                      <th>Entradas</th>
                      <th>Disponibles</th>
                      <th>Acciones</th>
                  </tr>
              </thead>
              <tbody>
                  {talleres.map(taller => (
                      <tr key={taller.id}>
                        <td>{taller.titulo}</td>
                        <td>{taller.lugar}</td>
                        <td>{taller.autor}</td>
                        <td>{taller.entradas}</td>
                        <td>{taller.entradas - taller.prestados.length}</td>
                        <td>
                            <Link
                            to={`/talleres/mostrar/${taller.id}`}
                            className="btn btn-success btn-block"
                            >
                            <i className="fas fa-angle-double-right"></i> {''}
                            Mas Información
                            </Link>

                            <button 
                                type="button"
                                className="btn btn-danger btn-block"
                                onClick={() => eliminarTaller(taller.id)}
                                >
                                    <i className="fas fa-trash-alt"></i> {''}
                                    Eliminar
                                </button>
                        </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
    );
}

Talleres.propTypes = {
    firestore: PropTypes.object.isRequired,
    talleres: PropTypes.array
}

export default compose(
    firestoreConnect([{collection : 'talleres'}]),
    connect((state, props) => ({
        talleres : state.firestore.ordered.talleres
    }))
)(Talleres);