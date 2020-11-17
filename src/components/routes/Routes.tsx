import React, {FunctionComponent} from "react";
import {IonReactRouter} from '@ionic/react-router';
import Login from "../../pages/login/Login";
import {Redirect, Route} from 'react-router-dom';
import Newness from "../../pages/newness/Newness";
import Products from "../../pages/products/Products";
import Chat from "../../pages/chat/Chat";
import Profile from "../../pages/profile/Profile";
import ChatBubble from "../chat/ChatBubble";
import Register from "../../pages/register/Register"
import Form from "../../pages/form/Form"
import Cart from "../../pages/cart/Cart"
import {IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs} from "@ionic/react";
import {ellipse, square, triangle} from "ionicons/icons";

const Routes: FunctionComponent = () => {
    return (
        <IonReactRouter>
            <IonTabs>
                <IonRouterOutlet>
                    <Route path="/login" component={Login} exact={true}/>
                    <Route path="/noticias" component={Newness} exact={true}/>
                    <Route path="/productos" component={Products} exact={true}/>
                    <Route path="/chat" component={Chat} exact={true}/>
                    <Route path="/chatdetail" component={ChatBubble} exact={true}/>
                    <Route path="/perfil" component={Profile} exact={true}/>
                    <Route path="/registro" component={Register} exact={true}/>
                    <Route path="/formulario" component={Form} exact={true}/>
                    <Route path="/carrito" component={Cart} exact={true}/>
                    <Route path={'/'} render={() => <Redirect to={'/login'}/>} exact={true}/>
                </IonRouterOutlet>
                <IonTabBar slot="bottom">
                    <IonTabButton tab="tab1" href="/tab1">
                        <IonIcon icon={triangle}/>
                        <IonLabel>Tab 1</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="tab2" href="/tab2">
                        <IonIcon icon={ellipse}/>
                        <IonLabel>Tab 2</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="tab3" href="/tab3">
                        <IonIcon icon={square}/>
                        <IonLabel>Tab 3</IonLabel>
                    </IonTabButton>
                </IonTabBar>
            </IonTabs>
        </IonReactRouter>
    );

}
export default Routes;
