import React, {FunctionComponent} from "react";
import {IonButton, IonFooter, IonIcon, IonToolbar} from "@ionic/react";
import {
    chatbubbles,
    chatbubblesOutline, map,
    mapOutline, notifications,
    notificationsOutline, person,
    personOutline,
    storefront,
    storefrontOutline
} from 'ionicons/icons';
import './Footer.css';
import {useHistory} from "react-router-dom";

const Footer: FunctionComponent = () => {
    const history = useHistory();
    const currentLocation = history.location.pathname;
    return (
        <IonFooter>
            <IonToolbar>
                <div className="footer-bar">
                    <IonButton onClick={() => history.push('/products')} fill="clear" className="btn-color">
                        <IonIcon slot="icon-only" icon={currentLocation === '/products' ? storefront: storefrontOutline}/>
                    </IonButton>
                    <IonButton onClick={() => history.push('/newness')} fill="clear" className="btn-color">
                        <IonIcon slot="icon-only" icon={currentLocation === '/newness' ? notifications: notificationsOutline}/>
                    </IonButton>
                    <IonButton onClick={() => history.push('/branchOffices')} fill="clear" className="btn-color">
                        <IonIcon slot="icon-only" icon={currentLocation === '/branchOffices' ? map: mapOutline}/>
                    </IonButton>
                    <IonButton onClick={() => history.push('/chat')} fill="clear" className="btn-color">
                        <IonIcon slot="icon-only" icon={currentLocation === '/chat' ? chatbubbles: chatbubblesOutline}/>
                    </IonButton>
                    <IonButton onClick={() => history.push('/profile')} fill="clear" className="btn-color">
                        <IonIcon slot="icon-only" icon={currentLocation === '/profile' ? person: personOutline}/>
                    </IonButton>
                </div>
            </IonToolbar>
        </IonFooter>
    );

}
export default Footer;
