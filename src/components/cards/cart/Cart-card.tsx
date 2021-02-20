import React, {FunctionComponent} from "react";
import {IonButton, IonCol, IonIcon, IonItem, IonLabel, IonRow, IonText,} from "@ionic/react";
import {addCircle, closeCircle, removeCircle, trashOutline,} from "ionicons/icons";
import useGlobal from "../../../hooks/globalShoppingCart";

export interface CartCardInfo {
    id: string;
    name: string;
    image: string;
    detail: string;
    quantity: number;
    loading: boolean;
}

const CartCard: FunctionComponent<CartCardInfo> = ({
                                                       id,
                                                       name,
                                                       image,
                                                       detail,
                                                       quantity,
                                                       loading,
                                                   }) => {
    const [globalState, globalActions] = useGlobal();
    const productIndex = globalState.shoppingCart.findIndex(
        (product: any) => product.id == id
    );

    return (
        <>
            <IonItem>
                <IonRow style={{width: "100%"}}>
                    <IonCol size={"5"}>
                        <img width="100px" height="100px" src={image}/>
                    </IonCol>
                    <IonCol size={"7"}>
                        <IonLabel>
                            <h2
                                style={{
                                    fontWeight: "bold",
                                    whiteSpace: "pre-wrap",
                                    paddingLeft: "10%",
                                }}
                            >
                                {name}
                            </h2>
                            <p style={{whiteSpace: "pre-wrap"}}>{detail}</p>
                        </IonLabel>
                        <IonRow
                            style={{
                                display: "flex",
                                justifyContent: "flex-end",
                                width: "100%",
                                alignItems: "center",
                            }}
                        >
                            {
                                <IonButton
                                    color={"danger"}
                                    fill="clear"
                                    disabled={loading}
                                    onClick={() => globalActions.changeQuantity(id, false)}
                                >
                                    <IonIcon
                                        slot="icon-only"
                                        icon={
                                            globalState.shoppingCart[productIndex]?.quantity === 1
                                                ? trashOutline
                                                : removeCircle
                                        }
                                    />
                                </IonButton>
                            }
                            <IonText>{quantity}</IonText>
                            <IonButton
                                color={"secondary"}
                                fill="clear"
                                disabled={
                                    globalState.shoppingCart[productIndex]?.quantity === 50 ||
                                    loading
                                }
                                onClick={() => globalActions.changeQuantity(id, true)}
                            >
                                <IonIcon slot="icon-only" icon={addCircle}/>
                            </IonButton>
                        </IonRow>
                    </IonCol>
                    <IonButton
                        color={"danger"}
                        fill={"clear"}
                        disabled={loading}
                        onClick={() => {
                            globalActions.removeProduct(id);
                        }}
                        style={{position: "absolute", right: 0}}
                    >
                        <IonIcon slot="icon-only" icon={closeCircle}/>
                    </IonButton>
                </IonRow>
            </IonItem>
        </>
    );
};
export default CartCard;
