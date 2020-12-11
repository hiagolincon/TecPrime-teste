import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Cart from '../pages/Cart';
import Category from '../pages/Category';
import Products from '../pages/Products';

import NotFound from './NotFound';

const Routes: React.FC = () => (
  <>
    <ToastContainer autoClose={2500} />
    <Switch>
      <Route path="/" exact component={Category} />
      <Route path="/product" exact component={Products} />
      <Route path="/cart" exact component={Cart} />
      <Route path="*">
        <NotFound />
      </Route>
    </Switch>
  </>
);

export default Routes;
