import * as React from "react";
import {Route, Switch, withRouter} from "react-router";
import {Home} from "./modules/page"

const AppRouting = (props) => {

    const render = () => {
        return (
            <Switch>
                <Route exact path="/" component={Home}/>
            </Switch>
        )
    }

    return render()
}

export default withRouter(AppRouting);