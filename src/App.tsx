import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Routes/Home';
import MenuList from './Routes/MenuList';
import Sandwich from './Routes/Sandwich';
import Wrap from './Routes/Wrap';
import FreshIngredients from './Routes/FreshIngredients';
import MyRecipeList from './Routes/MyRecipeList';
import Footer from './Components/Footer';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/menuList' element={<MenuList />}>
          <Route path='sandwich' element={<Sandwich />}/>
          <Route path='unit' element={<Wrap />}/>
        </Route>
        <Route path='/freshInfo' element={<FreshIngredients/>} />
        <Route path='/myRecipeList' element={<MyRecipeList/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;