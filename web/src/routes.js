import React from 'react';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';

import Pedido from './pages/Pedidos';
import ProrrogacaoPedido from './pages/ProrrogacaoPedidos';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Pedido} />
        <Route path="/prorrogacao-pedido/:id" exact component={ProrrogacaoPedido} />
      </Switch>
    </BrowserRouter>
  );
}