import React, {FunctionComponent} from "react";
import {IonAvatar, IonItem, IonLabel, IonList} from "@ionic/react";


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
