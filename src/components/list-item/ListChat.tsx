import React, {FunctionComponent} from "react";
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonLabel,
    IonList,
    IonAvatar,
    IonItem
} from "@ionic/react";
import {Redirect} from "react-router";


export interface ListChatInfo {
    name: string;
    image: string;
    message: string;
    description: string;
}

const ListChat: FunctionComponent<ListChatInfo> = ({name, image, message, description}) => {
    return (

        <IonList>
            <IonItem href="/chatdetail">
                <IonAvatar slot="start">
                    <img
                        src={image}/>
                </IonAvatar>
                <IonLabel>
                    <h2>{name}</h2>
                    <h3>{message}</h3>
                    <p>{description}</p>
                </IonLabel>
            </IonItem>
            <IonItem href="/chatdetail">
                <IonAvatar slot="start">
                    <img
                        src={image}/>
                </IonAvatar>
                <IonLabel>
                    <h2>{name}</h2>
                    <h3>{message}</h3>
                    <p>{description}</p>
                </IonLabel>
            </IonItem>
        </IonList>

    )
}
export default ListChat;
