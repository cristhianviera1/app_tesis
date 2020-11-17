import React, {FunctionComponent} from "react";
import {IonBackButton, IonButtons, IonHeader, IonLabel, IonToolbar} from "@ionic/react";

const Cart: FunctionComponent = () => {
    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/productos"/>
                    </IonButtons>
                    <IonLabel>Your Card</IonLabel>
                </IonToolbar>
            </IonHeader>


        </>
    );
};

export default Cart;
