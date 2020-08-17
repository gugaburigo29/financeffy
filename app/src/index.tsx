import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {store} from "./config/stores";
import {Routes} from "./Routes";

import "fontsource-roboto"
import "./index.css";

ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>,
    document.getElementById('root')
);
