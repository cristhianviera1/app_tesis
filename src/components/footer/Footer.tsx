import React, {FunctionComponent} from "react";
import {IonButton, IonFooter, IonIcon, IonToolbar} from "@ionic/react";
import {chatbubblesOutline, mapOutline, notificationsOutline, personOutline, storefrontOutline} from 'ionicons/icons';
import './Footer.css';

const Footer: FunctionComponent = () => {
    return (
        <IonFooter>
            <IonToolbar>
                <div className="footer-bar">
                    <IonButton href="/products" fill="clear" className="btn-color">
                        <IonIcon slot="icon-only" icon={storefrontOutline}/>
                    </IonButton>
                    <IonButton href="/newness" fill="clear" className="btn-color">
                        <IonIcon slot="icon-only" icon={notificationsOutline}/>
                    </IonButton>
                    <IonButton href="/branchOffices" fill="clear" className="btn-color">
                        <IonIcon slot="icon-only" icon={mapOutline}/>
                    </IonButton>
                    <IonButton href="/chat" fill="clear" className="btn-color">
                        <IonIcon slot="icon-only" icon={chatbubblesOutline}/>
                    </IonButton>
                    <IonButton href="/profile" fill="clear" className="btn-color">
                        <IonIcon slot="icon-only" icon={personOutline}/>
                    </IonButton>
                </div>
            </IonToolbar>
        </IonFooter>
    );

}
export default Footer;
