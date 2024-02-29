import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Routes/Home';
import MenuList from './Routes/MenuList';
import Sandwich from './Routes/Sandwich';
import Wrap from './Routes/Wrap';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;