import React, {FunctionComponent} from "react";
import {IonBackButton, IonButtons, IonHeader, IonLabel, IonToolbar} from "@ionic/react";
import CartCard from "../../components/cards/cart/Cart-card";

const Cart: FunctionComponent = () => {
    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/products"/>
                    </IonButtons>
                    <IonLabel>Your Card</IonLabel>
                </IonToolbar>
            </IonHeader>
<CartCard name={"Prep"} image={"https://diversah.files.wordpress.com/2019/10/prep-shutterstock-762208420_11115000_20190110191919.jpg?w=879"} detail={"La PrEP (Profilaxis Pre-Exposición) es un tratamiento preventivo para el VIH. El consumo reglamentado reduce muy significativamente la posibilidad de adquirir el VIH teniendo prácticas de riesgo."}/>

        </>
    );
};

export default Cart;
