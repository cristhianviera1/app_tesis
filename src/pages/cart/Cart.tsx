import React, {FunctionComponent, useEffect, useState} from "react";
import {
    IonBackButton, IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonHeader, IonIcon, IonInput, IonItem, IonLabel,
    IonList, IonListHeader, IonRadio,
    IonRadioGroup, IonRange,
    IonToolbar,
    IonRow, IonCol, IonText, IonContent
} from "@ionic/react";
import {addCircle, removeCircle, closeCircle} from "ionicons/icons";
import NewnessCard from "../../components/cards/newness/Newness-card";
import CartCard from "../../components/cards/cart/Cart-card";

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
            <IonList>
                <CartCard
                    title={"Prep"}
                    image={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.FJ_eY_RlE-nbyJi4U9ArigHaEm%26pid%3DApi&f=1"}
                    description={"pastilla prep :v"}
                />
            </IonList>

        </>
    );
};

export default Cart;
