import { Router, Switch } from 'react-router-dom';
// utils
import history from './utils/history';
// components
import LoginLayout from './components/layouts/LoginLayout';
import DefaultLayout from './components/layouts/DefaultLayout';

import ProductTourListPage from './pages/ProductTourList';
import LoginPage from './pages/Login';
import TourHomePage from './pages/ProductTourListHome';

function BrowserRouter() {
  return (
    <Router history={history}>
      <Switch>
        <DefaultLayout exact path="/" component={ProductTourListPage} />
        <LoginLayout exact path="/login" component={LoginPage} />
        <LoginLayout exact path="/Homee" component={TourHomePage} />
      </Switch>
    </Router>
  );
}

export default BrowserRouter;