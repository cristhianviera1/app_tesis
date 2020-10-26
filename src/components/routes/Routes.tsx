import React, {FunctionComponent} from "react";
import {NativeRouter, Route} from "react-router-native";
import Login from "../../pages/login/Login";
import Newness from "../../pages/newness/Newness";

const Routes: FunctionComponent = () => {
    return (
        <NativeRouter>
            <Route path={'/login'} component={Login}/>
            <Route path={'/'} component={Newness}/>
        </NativeRouter>
    )
}
export default Routes;
