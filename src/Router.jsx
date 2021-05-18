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
import ListHotelPage from './pages/ListHotel';
import ListRoomPage from './pages/ListRoom';
import reViewPage from './pages/Review';
import TourDetailPage from "./pages/ProductTourDetail";

function BrowserRouter(props) {
  const { productList } = props;
  return (
    <Router history={history}>
      <Switch>
        <DefaultLayout exact path="/homeTour" component={TourHomePage} />
        <LoginLayout exact path="/login" component={LoginPage} />
        <DefaultLayout exact path="/listTour" component={ProductTourListPage} />
        <DefaultLayout exact path="/tours/:id" component={TourDetailPage} />
        <DefaultLayout
          exact
          path={ROUTERS.HOME}
          component={HomePage}
          productList={productList}
        />
        <DefaultLayout
          exact
          path={ROUTERS.LIST_HOTEL}
          component={ListHotelPage}
          productList={productList}
        />
          <DefaultLayout
          exact
          path={ROUTERS.LIST_ROOM}
          component={ListRoomPage}
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