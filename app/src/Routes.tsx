import {Router, Switch, Route} from "react-router-dom"
import history from "./history";
import React, {useEffect} from "react";
import {SignIn} from "./modules/signin/SignIn";
import {SignLayout} from "./layouts/SignLayout";
import {SignUp} from "./modules/signup/SignUp";
import DashboardLayout from "./layouts/DashboardLayout";
import {useDispatch} from "react-redux";
import {loadUser} from "./modules/auth/action";
import Dashboard from "./modules/dashboard/Dashboard";

export function Routes() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUser());
    }, []);

    return (
        <Router history={history}>
            <Switch>
                <Route exact path="/">
                    <SignLayout>
                        <SignIn/>
                    </SignLayout>
                </Route>
                <Route exact path="/signup">
                    <SignLayout>
                        <SignUp/>
                    </SignLayout>
                </Route>
                <Route exact path="/dashboard">
                    <DashboardLayout>
                        <Dashboard />
                    </DashboardLayout>
                </Route>
            </Switch>
        </Router>
    )
}
