import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Tarea extends Component {
  constructor(props) {
    super(props);
    this.identificador = this.props.match.params.identificador;
  }

  render() {
    return (
      <section>
        <h1>
          {this.identificador === '0' ? 'Nueva tarea' : 'Editar tarea N° ' + this.identificador}
        </h1>
        <Link to="/">
          Cancelar
        </Link>

        <form action="">
          <label htmlFor="descripcion">Descripción</label>
          <input id="descripcion" type="text"/>

          <input type="checkbox" name="vigente" id="vigente"/>
          <label htmlFor="vigente">¿Vigente?</label>

          <button>Guardar</button>
        </form>
      </section>
    );
  }
}

export default Tarea;
