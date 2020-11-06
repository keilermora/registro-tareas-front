import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Error extends Component {
  render() {
    return (
      <section>
        <h1>Error</h1>
        <Link to="/">
          Volver al Inicio
        </Link>
      </section>
    );
  }
}

export default Error;
