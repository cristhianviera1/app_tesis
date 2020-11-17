import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import {IonApp, IonRouterOutlet} from '@ionic/react';
import {IonReactRouter} from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Login from "./pages/login/Login";
import Newness from "./pages/newness/Newness";
import Products from "./pages/products/Products";
import Chat from "./pages/chat/Chat";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Form from "./pages/form/Form";
import Cart from "./pages/cart/Cart";
import ChatBubble from "./components/chat/ChatBubble";

const App: React.FC = () => (
    <IonApp>
        <IonReactRouter>
            <IonRouterOutlet>
                <Route path="/login" component={Login} exact={true}/>
                <Route path="/register" component={Register} exact={true}/>
                <Route path="/newness" component={Newness} exact={true}/>
                <Route path="/products" component={Products} exact={true}/>
                <Route path="/chat" component={Chat} exact={true}/>
                <Route path="/chatdetail" component={ChatBubble} exact={true}/>
                <Route path="/profile" component={Profile} exact={true}/>
                <Route path="/form" component={Form} exact={true}/>
                <Route path="/cart" component={Cart} exact={true}/>
                <Route path={'/'} render={() => <Redirect to={'/login'}/>} exact={true}/>
            </IonRouterOutlet>
        </IonReactRouter>
    </IonApp>
);

export default App;
