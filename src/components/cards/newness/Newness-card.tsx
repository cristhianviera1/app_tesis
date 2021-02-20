import React, {FunctionComponent, useState} from "react";
import {IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle} from "@ionic/react";
import './Newness-card.css'

export interface NewnessCardInfo {
    title: string;
    image: string;
    description: string;
    link: string;
}

const NewnessCard: FunctionComponent<NewnessCardInfo> = ({title, image, description, link}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <IonCard className={"newness-card"} style={{marginTop:'3%'}}>
            <IonCardHeader>
                <img width="100%" height="100%" src={image}/>
                <IonCardTitle>{title}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                {
                    isOpen ?
                        description :
                        `${description.slice(0, 180)}.....`
                }
            </IonCardContent>
            <IonButton className={"btn"} expand="block" onClick={() => {
                setIsOpen(!isOpen)
            }}>{
                isOpen ? "Ver Menos" : "Leer más"
            }</IonButton>
        </IonCard>

    )
}
export default NewnessCard;
