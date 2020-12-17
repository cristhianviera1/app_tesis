import React, {FunctionComponent} from "react";
import {IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle} from "@ionic/react";
import './Products-card.css'
import {useHistory} from "react-router-dom";
import * as localStorage from "local-storage";
import {ProductCard} from "../../../pages/products/Products";


export interface ProductsCardInfo {
    id: string;
    name: string;
    image: string;
    detail: string;
    price: string;
}


const ProductsCard: FunctionComponent<ProductsCardInfo> = ({id, name, image, detail, price}) => {
    const history = useHistory();
    const addToCart = (product: ProductCard) => {
        const cartProducts: any = localStorage.get('products');
        localStorage.set('products', [...cartProducts, product])
    };
    return (
        <IonCard className={"product-card"} onClick={() => history.push({pathname: '/productDetail', state: id})}>
            <IonCardHeader>
                <img width="100%" height="100%" src={image}/>
                <IonCardSubtitle>{price}</IonCardSubtitle>
                <IonCardTitle>{name}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                {detail}
            </IonCardContent>
            <IonButton className={"btn"} expand={"block"}  onClick={()=>addToCart({
                _id: id,
                name,image,detail,price
            })}>Agregar al carrito</IonButton>
        </IonCard>
    )
}
export default ProductsCard;
