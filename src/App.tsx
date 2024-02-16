import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Routes/Home';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
