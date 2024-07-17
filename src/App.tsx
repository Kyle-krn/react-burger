import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/app-header';
import IngredientsPage from './pages/ingredients';
import BurgerConstructor from './components/burger-constructor';

function App() {
  return (
    <div className="App">
      <Header />
      <main className='text text_type_main-default' style={{maxWidth: '1240px', margin: '0 auto'}}>
        <IngredientsPage />
      </main>  
    </div>
  );
}

export default App;
