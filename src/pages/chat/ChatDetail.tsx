import React, {FunctionComponent} from 'react';
import {IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import './Chat.css';
import ChatBubble from "../../components/chat/ChatBubble";


const ChatDetail: FunctionComponent = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Chat</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonList>
                    <ChatBubble
                        color={"#f00"}
                        position={true}
                        message={{
                            type: "text",
                            message: "HOLA MAILOV"
                        }}
                    />
                </IonList>
            </IonContent>
        </IonPage>

    );
};

export default ChatDetail;
