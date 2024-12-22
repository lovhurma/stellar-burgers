import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { useEffect } from 'react';
import { getIngredients } from '../../services/ingredients/actions';
import { useDispatch } from '../../services/store';
import { getFeeds } from '../../services/feed/action';

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const background = location.state?.background;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getIngredients());
    console.log(dispatch(getFeeds()));
  }, []);
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={background || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        {/* Здесь будут защищенные роуты */}
        {/* <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/orders' element={<ProfileOrders />} /> */}
        {/* Здесь будут защищенные роуты */}
        {/* <Route path='*' element={<NotFound404 />} /> */}
      </Routes>
      {background && (
        <Routes>
          {/* <Route
            path='/feed/:number'
            element={
              <Modal title={''} onClose={() => navigate(-1)}>
                <OrderInfo />
              </Modal>
            }
          /> */}
          <Route
            path='/ingredients/:id'
            element={
              <Modal title={'Детали ингредиента'} onClose={() => navigate(-1)}>
                <IngredientDetails />
              </Modal>
            }
          />
          {/* <Route
            path='/profile/orders/:number'
            element={
              <Modal title={''} onClose={() => {}}>
                <OrderInfo />
              </Modal>
            }
          /> */}
        </Routes>
      )}
    </div>
  );
};

export default App;
