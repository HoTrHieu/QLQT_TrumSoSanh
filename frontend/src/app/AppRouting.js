import * as React from "react";
import { Route, Switch, withRouter } from "react-router";
import { Home, Compare } from "./modules/page";

const AppRouting = (props) => {
  const render = () => {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/shop/compare.html" component={Compare} />
      </Switch>
    );
  };

  return render();
};

export default withRouter(AppRouting);
