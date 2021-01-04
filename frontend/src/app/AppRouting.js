import * as React from "react";
import { Route, Switch, withRouter } from "react-router";
import { Home, Compare, Login, Register, ListProduct } from "./modules/page";

const AppRouting = (props) => {
  const render = () => {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/compare" component={Compare} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/list-product/:id" component={ListProduct} />
      </Switch>
    );
  };

  return render();
};

export default withRouter(AppRouting);
