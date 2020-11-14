import React, {FunctionComponent} from "react";
import {
    IonBackButton, IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonHeader, IonItem, IonLabel,
    IonList, IonListHeader, IonRadio,
    IonRadioGroup,
    IonToolbar
} from "@ionic/react";

const Cart: FunctionComponent = () => {
    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/productos" />
                    </IonButtons>
<IonLabel>Your Card</IonLabel>
                </IonToolbar>
            </IonHeader>


        </>
    );
};

export default Cart;
