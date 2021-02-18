import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import CartProvider from "./context/CartContext";
import ProductProvider from "./context/ProductContext";
import DeviceProvider from "./context/DeviceContext";

import Products from "./pages/ProductsPage.js";
import About from "./pages/AboutPage.js";
import Navbar from "./navbar.js";
import Home from "./pages/LandingPage.js";
import Cart from "./pages/CartPage.js";
import Checkout from "./pages/CheckoutPage .js";
import ProductViewer from "./productsviewer.js";
import ProductInfo from "./productinfo.js";

export const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/",
});

const ReactRouterSetup = () => {
  return (
    <ProductProvider>
      <CartProvider>
        <DeviceProvider>
          <Router>
            <Navbar />
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route
                exact
                path="/Products/search=:all"
                component={Products}
              ></Route>
              <Route
                exact
                path="/Product/:productName"
                children={<ProductInfo />}
              ></Route>
              <Route path="/About">
                <About />
              </Route>
              <Route path="/My-Cart">
                <Cart />
              </Route>
              <Route path="/Checkout">
                <Checkout />
              </Route>
            </Switch>
          </Router>
        </DeviceProvider>
      </CartProvider>
    </ProductProvider>
  );
};

export default ReactRouterSetup;

/* 
export const Page = () => {
  const [cart, setcart] = useState([]);

  const addtoCart = (event, data) => {
    event.preventDefault();
    setcart((old) => {
      return [...old, data];
    });
  };

  return (
    <div className="flex flex-row overflow-hidden">
      <Navbar cart={cart} />
      <ProductPage addtoCart={addtoCart} />
    </div>
  );
}; */

/* const Herohomepage = () => {
  const imgs = [heroimg, heroimg2];
  const [hero, sethero] = React.useState(imgs[0]);

  return (
    <div className="hero-slider">
      <img src={hero} className="hero-img" />
      <span className="dots">
        <span className="hero-dot" onClick={() => sethero(imgs[0])}></span>
        <span className="hero-dot" onClick={() => sethero(imgs[1])}></span>
        <span className="hero-dot"></span>
      </span>
    </div>
  );
};
 */
/* const Orderform = () => {
  return (
    <form action="">
      <input type="text" name="" id="" />
      <input type="text" name="" id="" />
      <input type="text" name="" id="" />
    </form>
  );
}; */
