import React, {FunctionComponent} from "react";
import {IonAvatar, IonButton, IonIcon, IonItem, IonLabel} from "@ionic/react";
import {ellipse} from "ionicons/icons";
import {useHistory} from "react-router-dom";


export interface ListChatInfo {
    id: string;
    name: string;
    image: string;
    message: string;
    description: string;
    active: boolean;
}

const ChatItem: FunctionComponent<ListChatInfo> = ({
                                                       id, name, image, message, description, active
                                                   }) => {
    const history = useHistory();
    return (
        <IonItem onClick={() => {
            history.push("/chatdetail", {name: name, id: id})
        }}>
            <IonAvatar slot="start">
                <img src={image ? image : "/assets/avatar.svg"} alt={'profile_picture'}/>
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
