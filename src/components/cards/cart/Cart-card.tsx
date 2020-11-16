import React, {FunctionComponent, useEffect, useState} from "react";
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle, IonCol,
    IonContent, IonIcon, IonItem, IonLabel,
    IonRouterOutlet,
    IonRow,
    IonTabButton, IonText
} from "@ionic/react"
import {addCircle, closeCircle, removeCircle} from "ionicons/icons";

export interface CartCardInfo {
    title: string;
    image: string;
    description: string;

}
const CartCard: FunctionComponent<CartCardInfo> = ({title, image,description}) => {
    const [number, setNumber] = useState<number>(1);
    useEffect(() => {
    }, [number])
    return(
        <IonItem>
            <IonRow style={{width:'100%'}}>
                <IonCol size={"5"}>
                    <img width="auto" height="100px"
                         src={image}/>
                </IonCol>
                <IonCol>
                    <IonLabel style={{minWidth:'100%'}}>
                        <h2 style={{fontWeight: "bold"}}>{title}</h2>
                        <p>{description}</p>
                    </IonLabel>
                    <IonRow style={{display:'flex', justifyContent:'flex-end', width:'100%', alignItems:'center'}}>
                        <IonButton color={'danger'} fill="clear" disabled={number == 1}
                                   onClick={() => setNumber(number - 1)}>
                            <IonIcon slot="icon-only" icon={removeCircle}/>
                        </IonButton>
                        <IonText>{number}</IonText>
                        <IonButton color={'secondary'} fill="clear" disabled={number == 50}
                                   onClick={() => setNumber(number + 1)}>
                            <IonIcon slot="icon-only" icon={addCircle}/>
                        </IonButton>
                    </IonRow>
                </IonCol>
                <IonButton  color={'danger'} fill={'clear'} style={{marginRight:"-14px"}}>
                    <IonIcon slot="icon-only" icon={closeCircle}/>
                </IonButton>
            </IonRow>
        </IonItem>
    )
}
export default CartCard;
