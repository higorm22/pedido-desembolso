import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';

import Pedido from './pages/Pedidos';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Pedido} />
      </Switch>
    </BrowserRouter>
  );
}