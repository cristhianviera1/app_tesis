import React, {FunctionComponent} from "react";
import {IonPage} from "@ionic/react";
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
