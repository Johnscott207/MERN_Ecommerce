import Content from './component/content';
import ProductDetail from './component/ProductDetail';
import Navbar from './component/navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import useGlobalState from './globalState';
import Login from './component/login';
import SignIn from './component/sign_in';
import AddCart from './component/addCart';
import BuyNow from './component/buyPage';


function App() {

  // using our `GlobalState`
  const [count, setCount] = useGlobalState('login');

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route index element={<Content />} />
        <Route path="/detail/:id/:slug" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/cart" element={<AddCart />} />
        <Route path="/buy/:slug/:id" element={<BuyNow />} />
        <Route path="/*" element={<Content />} />
        {/* <Route path="/admin" element={<ProductDetail />} /> */}
        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>

    </BrowserRouter>
  );
}

export default App;
