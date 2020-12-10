import React from "react";
import { Switch, Route } from "react-router-dom";
import Cart from "../pages/Cart";
import Category from "../pages/Category";
import Products from "../pages/Products";


const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Category} />
    <Route path="/product/:id" exact component={Products} />
    <Route path="/cart" exact component={Cart} />
  </Switch>
);

export default Routes;
