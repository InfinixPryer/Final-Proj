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
import ProductInfo from "./productinfo.js";
import Admin from "./pages/AdminPage ";

export const api = axios.create({
  baseURL: "http://localhost:9000/",
});

const ReactRouterSetup = () => {
  return (
    <DeviceProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <ProductProvider>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/Products" children={<Products />}></Route>
              <Route
                exact
                path="/Products/:product_name"
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
              <Route path="/Admin">
                <Admin />
              </Route>
            </Switch>
          </ProductProvider>
        </Router>
      </CartProvider>
    </DeviceProvider>
  );
};

export default ReactRouterSetup;
