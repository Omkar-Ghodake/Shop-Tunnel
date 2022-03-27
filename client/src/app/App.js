import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from '../components/home/Home';
import ProductState from '../context/products/ProductState';
import Navbar from '../components/Navbar';
import WishlistState from '../context/wishlists/WishlistState';
import AdminLogin from '../components/admin/AdminLogin';
import Alert from '../components/Alert';
import AlertState from '../context/alert/AlertState';
import AdminMenu from '../components/admin/AdminMenu';
import AddProduct from '../components/admin/AddProduct';


function App() {

  return (
    <>
      <WishlistState>
        <ProductState>
          <AlertState>
            <BrowserRouter>
              <Navbar />
              <Alert />
              <div className="container">
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/admin/login' element={<AdminLogin />} />
                  <Route path='/admin/menu' element={<AdminMenu />} />
                  <Route path='/admin/menu/add-product' element={<AddProduct />} />
                </Routes>
              </div>
            </BrowserRouter>
          </AlertState>
        </ProductState>
      </WishlistState>
    </>
  );
}

export default App;
