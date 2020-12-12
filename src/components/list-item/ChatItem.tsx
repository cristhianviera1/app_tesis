import React, {FunctionComponent} from "react";
import {IonAvatar, IonButton, IonIcon, IonItem, IonLabel} from "@ionic/react";
import {ellipse} from "ionicons/icons";


export interface ListChatInfo {
    name: string;
    image: string;
    message: string;
    description: string;
    active: boolean;
}

const ChatItem: FunctionComponent<ListChatInfo> = ({name, image, message, description, active}) => {
    return (
        <IonItem href="/chatdetail">
            <IonAvatar slot="start">
                <img src={image ? image : "/assets/profilePicture.png"}/>
            </IonAvatar>
            <IonLabel>
                <h2>{name}</h2>
                <h3>{message}</h3>
                <p>{description}</p>
            </IonLabel>
            <IonButton fill={'clear'} style={{textAlign: 'left'}}>
                <IonIcon slot="icon-only" icon={ellipse} color={active ? 'success' : 'medium'}/>
            </IonButton>
        </IonItem>
    )
}
export default ChatItem;
