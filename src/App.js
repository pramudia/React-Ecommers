
import './App.css';
import Header from './components/Header/Header';
import Cart from './components/Cart/Cart';
import Home from './components/Home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NotFound from './components/NotFound/NotFound';
import Login from './components/Login/Login';

function App() {


  return (
    <BrowserRouter>
      <Header />
      <div>
        <Routes>
          <Route path='/' exact element={<Home />} />
        </Routes>

        <Routes>
          <Route path='/cart' exact element={<Cart />} />
        </Routes>
        <Routes>
          <Route path="/404" exact element={<NotFound />} />
        </Routes>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
