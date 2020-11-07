import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    fetch("http://localhost:9000/api/tareas")
      .then(res => res.json())
      .then(result => {
          this.setState({
            cargando: false,
            tareas: result,
          });
        }, error => {
          this.setState({
            cargando: false,
            error: error,
          });
        });
  }

  onClickDeleteButton(event, identificador) {
    fetch(`http://localhost:9000/api/tareas/${identificador}`, {
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
    const { error, cargando, tareas } = this.state;
    if (error) {
      return <div>Ocurrió un error: {error.message}</div>;
    } else if(cargando) {
      return <div>Cargando...</div>;
    } else {
      return (
        <section>
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
                <td>{tarea.vigente}</td>
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

export default Inicio;
