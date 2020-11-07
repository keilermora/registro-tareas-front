import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';
import './App.css';

import Inicio from './pages/Inicio/Inicio';
import Tarea from './pages/Tarea/Tarea';
import Error from './pages/Error/Error';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Inicio} />
          <Route exact path="/tarea/:identificador" component={Tarea} />
          <Route component={Error} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
