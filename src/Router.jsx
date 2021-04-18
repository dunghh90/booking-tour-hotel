import { Router, Switch, Route } from 'react-router-dom';
// utils
import history from './utils/history';
// components
import ToDoListPage from './pages/ListTour';
import HomePage from './pages/Home';

function BrowserRouter() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </Router>
  );
}

export default BrowserRouter;