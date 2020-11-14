import React, {FunctionComponent} from "react";
import {
    IonApp,
    IonFooter,
    IonIcon,
    IonLabel,
    IonPage,
    IonTabBar,
    IonTabButton,
    IonTabs, IonTitle,
    IonToolbar
} from "@ionic/react";
import {bag, chatbox, notifications, person} from "ionicons/icons";
import Footer from "../footer/Footer";

const Layout: FunctionComponent = ({children}) => {

    return (
        <IonPage>
            {children}
            <Footer />
        </IonPage>
    )
}
export default Layout;
