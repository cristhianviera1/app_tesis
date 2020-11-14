import React, {FunctionComponent} from "react";
import {IonCol, IonFooter, IonGrid, IonPage, IonRow, IonTitle, IonToolbar, IonButton, IonIcon} from "@ionic/react";
import {bag, notifications, chatbubbles, person} from 'ionicons/icons';
import './Footer.css';

const Footer: FunctionComponent = () => {
    return (
        <IonFooter>
            <IonToolbar>
                <div className="footer-bar">
                    <IonButton href="/productos" fill="clear" className="btn-color">
                        <IonIcon slot="icon-only" icon={bag}/>
                    </IonButton>
                    <IonButton href="/noticias" fill="clear" className="btn-color">
                        <IonIcon slot="icon-only" icon={notifications}/>
                    </IonButton>
                    <IonButton href="/chat" fill="clear" className="btn-color">
                        <IonIcon slot="icon-only" icon={chatbubbles}/>
                    </IonButton>
                    <IonButton href="/perfil" fill="clear" className="btn-color">
                        <IonIcon slot="icon-only" icon={person}/>
                    </IonButton>
                </div>
            </IonToolbar>
        </IonFooter>
    );

}
export default Footer;
