import { Router, Switch, Route } from 'react-router-dom';
// utils
import history from './utils/history';
// components
import LoginLayout from './components/layouts/LoginLayout';
import DefaultLayout from './components/layouts/DefaultLayout';

import ProductTourListPage from './pages/ProductTourList';
import LoginPage from './pages/Login';

function BrowserRouter() {
  return (
    <Router history={history}>
      <Switch>
        <DefaultLayout exact path="/" component={ProductTourListPage} />
        <LoginLayout exact path="/login" component={LoginPage} />
      </Switch>
    </Router>
  );
}

export default BrowserRouter;