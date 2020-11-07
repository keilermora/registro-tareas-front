import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setCargando } from '../../redux/actions';
import './Inicio.css';

class Inicio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      cargando: true,
      tareas: []
    };

    this.onClickDeleteButton = this.onClickDeleteButton.bind(this);
    this.getData = this.getData.bind(this);
    this.updateCargando = this.updateCargando.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    this.updateCargando(true);
    fetch(`${process.env.REACT_APP_API_URL}/tareas`)
      .then(res => res.json())
      .then(result => {
        this.setState({ tareas: result });
      }).catch(error => {
        this.setState({ error: error });
      }).finally(() => {
        this.updateCargando(false);
      });
  }

  updateCargando(cargando) {
    const { setCargando: setCargandoDispatch } = this.props;
    return setCargandoDispatch(cargando);
  }

  onClickDeleteButton(event, identificador) {
    fetch(`${process.env.REACT_APP_API_URL}/tareas/${identificador}`, {
      method: 'DELETE',
    }).then(result => {
      this.getData();
    }, error => {
      this.setState({
        cargando: false,
        error: error,
      });
    });
  }

  render() {
    const { cargando } = this.props;
    const { error, tareas } = this.state;

    if (error) {
      return <div>Ocurrió un error: {error.message}</div>;
    } else if(cargando) {
      return <div>Cargando...</div>;
    } else {
      return (
        <section className='page-inicio'>
        <h1>Registro de tareas</h1>
        <Link to={'tarea/0'}>
          Nueva tarea
        </Link>
        <table>
          <thead>
            <tr>
              <th>Identificador</th>
              <th>Descripcion</th>
              <th>Vigencia</th>
              <th>Fecha Creación</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tareas.map(tarea => (
              <tr key={tarea.identificador}>
                <td>{tarea.identificador}</td>
                <td>{tarea.descripcion}</td>
                <td>{tarea.vigente ? 'Si' : 'No'}</td>
                <td>{tarea.fechaCreacion}</td>
                <td>
                  <Link to={'tarea/' + tarea.identificador}>
                    Editar
                  </Link>
                  <button onClick={e => this.onClickDeleteButton(e, tarea.identificador)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </section>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  cargando: state.cargando,
});

const mapDispatchToProps = {
  setCargando: (cargando) => setCargando(cargando),
};

export default connect(mapStateToProps, mapDispatchToProps)(Inicio);
