import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import CartProvider from "./context/CartContext";
import ProductProvider from "./context/ProductContext";
import DeviceProvider from "./context/DeviceContext";
import PrivateRoute from "./pages/PrivateRoute";

import Products from "./pages/ProductsPage";
import Navbar from "./navbar";
import Home from "./pages/LandingPage";
import Cart from "./pages/CartPage";
import Checkout from "./pages/CheckoutPage";
import ProductInfo from "./productinfo";
import Admin from "./pages/AdminPage";
import Login from "./pages/LoginPage";

export const api = axios.create({
  baseURL: "https://testcofmon.herokuapp.com",
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
              <PrivateRoute exact path="/Admin" component={Admin} />
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
