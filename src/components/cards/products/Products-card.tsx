import React, {FunctionComponent, useEffect, useState} from "react";
import {IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle} from "@ionic/react";
import './Products-card.css'
import {useHistory} from "react-router-dom";
import useGlobal from "../../../hooks/globalShoppingCart";

export interface ProductsCardInfo {
    id: string;
    name: string;
    image: string;
    detail: string;
    price: number;
    quantity: number;
}

const ProductsCard: FunctionComponent<ProductsCardInfo> = ({id, name, image, detail, price, quantity}) => {
    const history = useHistory();

    const [productAlreadyInCart, setAlreadyInCart] = useState<boolean>(false)
    const [globalState, globalActions] = useGlobal();

    useEffect(() => {
        setAlreadyInCart(globalState.shoppingCart.findIndex((product: ProductsCardInfo) => product.id == id) !== -1)
    }, [globalState])

    return (
        <IonCard
            key={id}
            className={"product-card"}
        >
            <IonCardHeader onClick={() => history.push('/productDetail', id)}>
                <img width="100%" height="100%" src={image} style={{borderTopLeftRadius:'5%', borderTopRightRadius:'5%'}}/>
                <IonCardSubtitle>${price}</IonCardSubtitle>
                <IonCardTitle>{name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent onClick={() => history.push('/productDetail', id)}>
                {detail}
            </IonCardContent>
            {
                !productAlreadyInCart &&
                <IonButton className={"btn"} expand={"block"} onClick={() => {
                    globalActions.addProduct({
                        id, name, image, detail, price, quantity: 1
                    })
                }}>Agregar al carrito
                </IonButton>
            }
            {
                productAlreadyInCart &&
                <IonButton className={"btn"} expand={"block"} fill={'outline'} onClick={() => {
                    globalActions.changeQuantity(id, true)
                }}>
                    Añadir más
                </IonButton>
            }
        </IonCard>
    )
}
export default ProductsCard;
