import React, {FunctionComponent} from "react";
import {IonButton, IonFooter, IonIcon, IonToolbar} from "@ionic/react";
import {chatbubblesOutline, mapOutline, notificationsOutline, personOutline, storefrontOutline} from 'ionicons/icons';
import './Footer.css';
import {useHistory} from "react-router-dom";

const Footer: FunctionComponent = () => {
    const history = useHistory();

    return (
        <IonFooter>
            <IonToolbar>
                <div className="footer-bar">
                    <IonButton onClick={() => history.push('/products')} fill="clear" className="btn-color">
                        <IonIcon slot="icon-only" icon={storefrontOutline}/>
                    </IonButton>
                    <IonButton onClick={() => history.push('/newness')} fill="clear" className="btn-color">
                        <IonIcon slot="icon-only" icon={notificationsOutline}/>
                    </IonButton>
                    <IonButton onClick={() => history.push('/branchOffices')} fill="clear" className="btn-color">
                        <IonIcon slot="icon-only" icon={mapOutline}/>
                    </IonButton>
                    <IonButton onClick={() => history.push('/chat')} fill="clear" className="btn-color">
                        <IonIcon slot="icon-only" icon={chatbubblesOutline}/>
                    </IonButton>
                    <IonButton onClick={() => history.push('/profile')} fill="clear" className="btn-color">
                        <IonIcon slot="icon-only" icon={personOutline}/>
                    </IonButton>
                </div>
            </IonToolbar>
        </IonFooter>
    );

}
export default Footer;
