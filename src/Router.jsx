import { Router, Switch } from 'react-router-dom';
// utils
import history from './utils/history';
import { ROUTERS } from './constants/router';
// components
import LoginLayout from './components/layouts/LoginLayout';
import DefaultLayout from './components/layouts/DefaultLayout';

import ProductTourListPage from './pages/ProductTourList';
import LoginPage from './pages/Login';
import TourHomePage from './pages/ProductTourListHome';
import HomePage from './pages/Home';
import DetailPage from './pages/Detail';
import reViewPage from './pages/Review';

function BrowserRouter(props) {
  const { productList } = props;
  console.log("🚀 ~ file: Router.jsx ~ line 18 ~ BrowserRouter ~ productList", productList)
  return (
    <Router history={history}>
      <Switch>
        {/* <DefaultLayout exact path="/" component={ProductTourListPage} /> */}
        <LoginLayout exact path="/login" component={LoginPage} />
        <LoginLayout exact path="/Homee" component={TourHomePage} />
        <DefaultLayout
          exact
          path={ROUTERS.HOME}
          component={HomePage}
          productList={productList}
        />
        <DefaultLayout
          exact
          path={ROUTERS.PRODUCT_DETAIL}
          component={DetailPage}
          productList={productList}
        />
         <DefaultLayout
          exact
          path={ROUTERS.REVIEW}
          component={reViewPage}
          productList={productList}
        />
      </Switch>
      
    </Router>
  );
}

export default BrowserRouter;