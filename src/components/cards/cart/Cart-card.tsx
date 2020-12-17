import React, {FunctionComponent, useEffect, useState} from "react";
import {IonButton, IonCol, IonIcon, IonItem, IonLabel, IonRow, IonText} from "@ionic/react"
import {addCircle, closeCircle, removeCircle} from "ionicons/icons";
import * as localStorage from "local-storage";

export interface CartCardInfo {
    name: string;
    image: string;
    detail: string;
}
const CartCard: FunctionComponent<CartCardInfo> = ({name, image,detail}) => {
    const [number, setNumber] = useState<number>(1);




    const cartProducts = localStorage.get('products');


    useEffect(() => {
        console.log(cartProducts)
    }, [number])
    return(
        <>
        <IonItem>
            <IonRow style={{width:'100%'}}>
                <IonCol size={"5"}>
                    <img width="auto" height="100px"
                         src={image}/>
                </IonCol>
                <IonCol>
                    <IonLabel style={{minWidth:'100%'}}>
                        <h2 style={{fontWeight: "bold"}}>{name}</h2>
                        <p>{detail}</p>
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
    <IonButton className={"btn"} expand={"block"}>Agregar al carrito</IonButton>
            </>
    )
}
export default CartCard;
