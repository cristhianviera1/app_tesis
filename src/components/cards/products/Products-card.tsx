import React, {FunctionComponent} from "react";
import {IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle} from "@ionic/react";
import './Products-card.css'

export interface ProductsCardInfo {
    title: string;
    image: string;
    description: string;
    price: string;
}

const ProductsCard: FunctionComponent<ProductsCardInfo> = ({title, image, description, price}) => {
    return (
        <IonCard className={"product-card"}>
            <IonCardHeader>
                <img width="100%" height="100%" src={image}/>
                <IonCardSubtitle>{price}</IonCardSubtitle>
                <IonCardTitle>{title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                {description}
            </IonCardContent>
            <IonButton className={"btn"} expand={"block"} color="success" href="/login">Comprar</IonButton>
        </IonCard>

    )
}
export default ProductsCard;
