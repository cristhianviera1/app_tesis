import React, {FunctionComponent, useEffect, useState} from "react";
import {IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle} from "@ionic/react";
import './Products-card.css'
import {useHistory} from "react-router-dom";
import {createGlobalState} from "react-hooks-global-state";

export interface ProductsCardInfo {
    id: string;
    name: string;
    image: string;
    detail: string;
    price: string;
    quantity: number;
}


const ProductsCard: FunctionComponent<ProductsCardInfo> = ({id, name, image, detail, price, quantity}) => {
    const history = useHistory();
    const initialState: ProductsCardInfo[] = [];
    const {useGlobalState} = createGlobalState({cartProducts: initialState})
    const [products, setProducts] = useGlobalState('cartProducts');
    const [productAlreadyInCart, setAlreadyInCart] = useState<boolean>(false)

    useEffect(() => {
        setAlreadyInCart(products?.findIndex((product: ProductsCardInfo) => product.id == id) !== -1)
    }, [products])

    return (
        <IonCard
            key={id}
            className={"product-card"}
        >
            <IonCardHeader onClick={() => history.push('/productDetail', id)}>
                <img width="100%" height="100%" src={image}/>
                <IonCardSubtitle>{price}</IonCardSubtitle>
                <IonCardTitle>{name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent onClick={() => history.push('/productDetail', id)}>
                {detail}
            </IonCardContent>
            {
                !productAlreadyInCart &&
                <IonButton className={"btn"} expand={"block"} onClick={() => {
                }/*addToCart({
                        id: id,
                        name, image, detail, price, quantity: 1
                    })*/}>Agregar al carrito
                </IonButton>
            }
            {
                productAlreadyInCart &&
                <IonButton className={"btn"} expand={"block"} fill={'outline'} onClick={() => {
                }/*addQuantity(id)*/}>
                    Añadir más
                </IonButton>
            }
        </IonCard>
    )
}
export default ProductsCard;
