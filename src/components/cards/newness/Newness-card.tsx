import React, {FunctionComponent} from "react";
import {IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle} from "@ionic/react";
import './Newness-card.css'

export interface NewnessCardInfo {
    title: string;
    image: string;
    description: string;
    link: string;
}
const NewnessCard: FunctionComponent<NewnessCardInfo> = ({title, image,description,link}) => {
    return(
        <IonCard className={"newness-card"}>
            <IonCardHeader>
                <img width="100%" height="100%" src={image}/>
                <IonCardTitle>{title}</IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                {description}
            </IonCardContent>
            <IonButton className={"btn"} expand="block" href="/login">Leer más...</IonButton>
        </IonCard>

    )
}
export default NewnessCard;
