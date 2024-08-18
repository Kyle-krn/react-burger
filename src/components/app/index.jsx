import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './../app-header';
import IngredientsPage from '../../pages/ingredients';
import LoginPage from '../../pages/login';
import RegisterPage from '../../pages/register';
import ForgotPassword from '../../pages/forgotPassword';
import ResetPasswordPage from '../../pages/resetPassword';
import AccountPage from '../../pages/account';
import ProfilePage from '../../pages/account/profile';
import styles from './styles.module.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <main className={`text text_type_main-default ${styles.app}`}>
            <Routes>
              <Route path='' element={<IngredientsPage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/forgot-password' element={<ForgotPassword />} />
              <Route path='/reset-password' element={<ResetPasswordPage />} />
              <Route path='/profile' element={<AccountPage />}>
                <Route  path='' element={<ProfilePage />}/>
              </Route>
            </Routes>
        </main>  
      </BrowserRouter>
    </div>
  );
}

export default App;
