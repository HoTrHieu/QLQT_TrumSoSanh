import * as React from "react";
import { Route, Switch, withRouter } from "react-router";
import { Home, Compare, Login, Register, ListProduct } from "./modules/page";
import ListShopPage from "./modules/page/ListShop/ListShopPage";
import ProductDetail from "./modules/page/ProductDetail";

const AppRouting = (props) => {
  const render = () => {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/compare" component={Compare} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/list-product/:type/:id" component={ListProduct} />
        <Route exact path="/list-shop/:productId" component={ListShopPage} />
        <Route exact path="/product-detail" component={ProductDetail} />
      </Switch>
    );
  };

  return render();
};

export default withRouter(AppRouting);
