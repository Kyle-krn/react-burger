import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './../app-header';
import IngredientsPage from '../../pages/ingredients';
import LoginPage from '../../pages/login';
import styles from './styles.module.css';

function App() {
  return (
    <div>
      <Header />
      <main className={`text text_type_main-default ${styles.app}`}>
        <BrowserRouter>
          <Routes>
            <Route path='' element={<IngredientsPage />} />
            <Route path='/login' element={<LoginPage />} />
          </Routes>
        </BrowserRouter>
      </main>  
    </div>
  );
}

export default App;
