import { BrowserRouter, Switch, Route } from "react-router-dom";
import './App.css';

import Inicio from './pages/Inicio/Inicio';
import Tarea from './pages/Tarea/Tarea';
import Error from './pages/Error/Error';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Switch>
          <Route exact path="/" component={Inicio} />
          <Route exact path="/tarea/:identificador" component={Tarea} />
          <Route component={Error} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
