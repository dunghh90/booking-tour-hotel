import { Router, Switch } from 'react-router-dom';
// utils
import history from './utils/history';
import { ROUTERS } from './constants/router';
// components
import LoginLayout from './components/layouts/LoginLayout';
import DefaultLayout from './components/layouts/DefaultLayout';

import TourListPage from './pages/TourList';
import LoginPage from './pages/Login';
import TourHomePage from './pages/TourHome';
import HomePage from './pages/HotelHome';
import ListHotelPage from './pages/HotelList';
import ListRoomPage from './pages/HotelDetail';
import reViewPage from './components/Review';
import TourDetailPage from "./pages/TourDetail";
import ProfilePage from "./pages/Profile"

function BrowserRouter(props) {
  const { productList } = props;
  return (
    <Router history={history}>
      <Switch>
        <DefaultLayout exact path="/homeTour" component={TourHomePage} />
        <LoginLayout exact path="/login" component={LoginPage} />
        <DefaultLayout exact path="/listTour" component={TourListPage} />
        <DefaultLayout exact path="/tours/:id" component={TourDetailPage} />
        {/* <DefaultLayout exact path="/profile/:id" component={ProfilePage} /> */}
        <DefaultLayout
          exact
          path={ROUTERS.PROFILE}
          component={ProfilePage}
        />
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