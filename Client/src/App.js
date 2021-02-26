import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import CartProvider from "./context/CartContext";
import ProductProvider from "./context/ProductContext";
import DeviceProvider from "./context/DeviceContext";

import Products from "./pages/ProductsPage";
import Navbar from "./navbar";
import Home from "./pages/LandingPage";
import Cart from "./pages/CartPage";
import Checkout from "./pages/CheckoutPage";
import ProductInfo from "./productinfo";
import Admin from "./pages/AdminPage";
import Login from "./pages/LoginPage";

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
              <Route path="/My-Cart">
                <Cart />
              </Route>
              <Route path="/Checkout">
                <Checkout />
              </Route>
              <Route exact path="/Admin">
                <Admin />
              </Route>
              <Route path="/Admin/Login">
                <Login />
              </Route>
            </Switch>
          </ProductProvider>
        </Router>
      </CartProvider>
    </DeviceProvider>
  );
};

export default ReactRouterSetup;
