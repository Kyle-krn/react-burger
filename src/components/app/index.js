import Header from './../app-header';
import IngredientsPage from '../../pages/ingredients';
import styles from './styles.module.css';

function App() {
  return (
    <div>
      <Header />
      <main className={`text text_type_main-default ${styles.app}`}>
        <IngredientsPage />
      </main>  
    </div>
  );
}

export default App;
