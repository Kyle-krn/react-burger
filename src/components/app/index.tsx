import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from '../app-header';
import IngredientsPage from '../../pages/ingredients';
import LoginPage from '../../pages/login';
import RegisterPage from '../../pages/register';
import ForgotPassword from '../../pages/forgotPassword';
import ResetPasswordPage from '../../pages/resetPassword';
import AccountPage from '../../pages/account';
import ProfilePage from '../../pages/account/profile';
import styles from './styles.module.css';
import ErrorServerPage from '../../pages/error/errorServer';
import ProtectedRouteElement from '../protected-route';
import { useEffect } from 'react';
import { getUserInfo } from '../../services/user';
import IngredientDetails from '../ingredient-details';
import { getIngredients } from '../../services/ingredients';
import Modal from '../modal';
import { useAppDispatch, useAppSelector } from '../../services';
import FeedPage from '../../pages/feed';
import FeedDetails from '../feed-details';
import FeedModal from '../feed-modal';
import OrdersPage from '../../pages/orders';

function App() {
  const { isLoadingUser } = useAppSelector(state => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state?.background;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUserInfo());
    dispatch(getIngredients());
  }, [dispatch])
  return (
    <div>
      {
        isLoadingUser
        ? <>Идет загрузка</>
        : <>
          <Header />
          <main className={`text text_type_main-default ${styles.app}`}>
              <Routes location={background || location}>
                <Route path='/' element={<IngredientsPage />} />
                <Route path='/feed' element={<FeedPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/register' element={<RegisterPage />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='/reset-password' element={<ResetPasswordPage />} />
                <Route path='/ingredients/:id' element={<IngredientDetails />} />
                <Route path='/feed/:id' element={<FeedDetails />} />
                <Route path='/profile/orders/:id' element={<ProtectedRouteElement element={<OrdersPage />}/>} />
                <Route path='/profile' element={<ProtectedRouteElement element={<AccountPage />}/>}>
                  <Route  path='' element={<ProfilePage />}/>
                  <Route  path='orders' element={<OrdersPage />}/>
                </Route>
                <Route path='*' element={<ErrorServerPage statusCode='404' errorText='Страница не найдена'/>}/>
              </Routes>

              {background && (
              <Routes>
                <Route
                  path="/ingredients/:id"
                  element={
                    <Modal onClose={() => navigate(-1)} title="Детали ингредиента">
                      <IngredientDetails />
                    </Modal>
                  }
                />
                <Route
                  path="/feed/:id"
                  element={<FeedModal />}
                />
                <Route
                  path="/profile/orders/:id"
                  element={<FeedModal />}
                />
              </Routes> 
              )}
          </main>  
        </>
      }
    </div>
  );
}

export default App;