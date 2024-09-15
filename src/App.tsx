import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Pages/Home';
import MenuList from './Pages/MenuList';
import Sandwich from './Pages/Sandwich';
import Wrap from './Pages/Wrap';
import FreshIngredients from './Pages/FreshIngredients';
import MyRecipeList from './Pages/MyRecipeList';
import Footer from './Components/Footer';
import RegisterMyRecipe from './Pages/RegisterMyRecipe';
import MyRecipeDetail from './Pages/MyRecipeDetail';
import MenuItemDetail from './Pages/MenuItemDetail';
import UtilizationSubway from './Pages/UtilizationSubway';
import Join from './Pages/Join';
import Login from './Pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/join' element={<Join />} />
        <Route path='/login' element={<Login />} />
        <Route path='/menuList' element={<MenuList />}>
          <Route path='sandwich' element={<Sandwich />}/>
          <Route path='unit' element={<Wrap />}/>
        </Route>
        <Route path='/menuView/:menuCategory?' element={<MenuItemDetail/> } />
        <Route path='/utilizationSubway' element={<UtilizationSubway />} />
        <Route path='/freshInfo' element={<FreshIngredients/>} />
        <Route path='/myRecipeList' element={<MyRecipeList/>} />
        <Route path='/myRecipeView/recipe?' element={<MyRecipeDetail/>} />
        <Route path='/myRecipeList/registerMyRecipe' element={<RegisterMyRecipe />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;