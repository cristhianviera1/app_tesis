import React, {FunctionComponent} from "react";
import {IonReactRouter} from "@ionic/react-router";
import {IonRouterOutlet} from "@ionic/react";
import Login from "../../pages/login/Login";
import {Route} from "react-router";
import Newness from "../../pages/newness/Newness";
import Products from "../../pages/products/Products";
import Chat from "../../pages/chat/Chat";
import Profile from "../../pages/profile/Profile";
import ChatBubble from "../chat/ChatBubble";
import Register from "../../pages/register/Register"
import Form from "../../pages/form/Form"
import Cart from "../../pages/cart/Cart"
import ProductView from "../../pages/products/ProductView";

const Routes: FunctionComponent = () => {
    return (
        <IonReactRouter>
            <IonRouterOutlet>
                <Route path="/" component={Login}/>
                <Route path="/noticias" component={Newness} exact={true}/>
                <Route path="/productos" component={Products} exact={true}/>
                <Route path="/chat" component={Chat} exact={true}/>
                <Route path="/chatdetail" component={ChatBubble} exact={true}/>
                <Route path="/perfil" component={Profile} exact={true}/>
                <Route path="/registro" component={Register} exact={true}/>
                <Route path="/formulario" component={Form} exact={true}/>
                <Route path="/carrito" component={Cart} exact={true}/>
                <Route path="/productodetalle" component={ProductView} exact={true}/>
            </IonRouterOutlet>
        </IonReactRouter>
    );

}
export default Routes;
