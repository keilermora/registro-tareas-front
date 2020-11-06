import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Inicio extends Component {
  render() {
    return (
      <section>
        <h1>Registro de tareas</h1>
        <Link to={'tarea/0'}>
          Nueva tarea
        </Link>
        <table>
          <tr>
            <th>Identificador</th>
            <th>Descripcion</th>
            <th>Vigencia</th>
            <th>Fecha Creación</th>
            <th></th>
          </tr>
          <tr>
            <td>1</td>
            <td>Tarea 1</td>
            <td>Si</td>
            <td>{new Date().getTime()}</td>
            <td>
              <Link to={'tarea/' + 1}>
                Editar
              </Link>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Tarea 2</td>
            <td>Si</td>
            <td>{new Date().getTime()}</td>
            <td>
              <Link to={'tarea/' + 2}>
                Editar
              </Link>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Tarea 3</td>
            <td>Si</td>
            <td>{new Date().getTime()}</td>
            <td>
              <Link to={'tarea/' + 3}>
                Editar
              </Link>
            </td>
          </tr>
        </table>
      </section>
    );
  }
}

export default Inicio;
