import {Router, Switch, Route} from "react-router-dom"
import history from "./history";
import React from "react";
import {SignIn} from "./modules/signin/SignIn";
import {SignLayout} from "./layouts/SignLayout";

export function Routes() {
    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/">
                    <SignLayout>
                        <SignIn/>
                    </SignLayout>
                </Route>
            </Switch>
        </Router>
    )
}
