import React, {FunctionComponent} from "react";
import {IonButton, IonFooter, IonIcon, IonToolbar} from "@ionic/react";
import {bag, chatbubbles, notifications, person} from 'ionicons/icons';
import './Footer.css';

const Footer: FunctionComponent = () => {
    return (
        <IonFooter>
            <IonToolbar>
                <div className="footer-bar">
                    <IonButton href="/products" fill="clear" className="btn-color">
                        <IonIcon slot="icon-only" icon={bag}/>
                    </IonButton>
                    <IonButton href="/newness" fill="clear" className="btn-color">
                        <IonIcon slot="icon-only" icon={notifications}/>
                    </IonButton>
                    <IonButton href="/chat" fill="clear" className="btn-color">
                        <IonIcon slot="icon-only" icon={chatbubbles}/>
                    </IonButton>
                    <IonButton href="/profile" fill="clear" className="btn-color">
                        <IonIcon slot="icon-only" icon={person}/>
                    </IonButton>
                </div>
            </IonToolbar>
        </IonFooter>
    );

}
export default Footer;
