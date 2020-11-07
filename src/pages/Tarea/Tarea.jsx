import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Tarea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cargando: false,
      error: null,
      identificador: parseInt(this.props.match.params.identificador),
      descripcion: '',
      vigente: false,
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if(this.state.identificador) {
      this.setState({ cargando: true });
      fetch(`http://localhost:9000/api/tareas/${this.state.identificador}`)
        .then(res => res.json())
        .then(result => {
            this.setState({
              cargando: false,
              descripcion: result.descripcion,
              vigente: result.vigente,
            });
          }, error => {
            this.setState({
              cargando: false,
              error: error,
            });
          });
    }
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { identificador, descripcion, vigente } = this.state
    let fetchUrl = 'http://localhost:9000/api/tareas';
    let method;

    if(identificador) {
      fetchUrl += `/${identificador}`
      method = 'PUT';
    } else {
      method = 'POST';
    }

    this.setState({ cargando: true });

    fetch(fetchUrl, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        descripcion: descripcion,
        vigente: vigente,
      })
    })
      .then(res => res.json())
      .then(result => {
          this.props.history.push('/');
        }, error => {
          this.setState({
            cargando: false,
            error: error,
          });
        });
  }

  render() {
    const { error, cargando, identificador, descripcion, vigente } = this.state;

    if(error) {
      return <div>Ocurrió un error: {error.message}</div>;
    } else if(cargando) {
      return <div>Cargando...</div>;
    } else {
      return (
        <section>
          <h1>
            {!identificador ? 'Nueva tarea' : `Editar tarea N°${identificador}`}
          </h1>
          <Link to="/">
            Cancelar
          </Link>

          <form onSubmit={this.handleSubmit}>
            <label htmlFor="descripcion">Descripción</label>
            <input id="descripcion" name="descripcion" type="text" value={descripcion} onChange={this.handleInputChange} required minLength={1} maxLength={255}/>

            <input type="checkbox" name="vigente" id="vigente" checked={vigente} onChange={this.handleInputChange}/>
            <label htmlFor="vigente">¿Vigente?</label>

            <button type="submit">Guardar</button>
          </form>
        </section>
      );
    }
  }
}

export default Tarea;
