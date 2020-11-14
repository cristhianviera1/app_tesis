import React, {FunctionComponent} from 'react';
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import './Chat.css';
import Layout from "../../components/layout/Layout";
import ListChat from "../../components/list-item/ListChat";


const Chat: FunctionComponent = () => {
    return (
        <Layout>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Chat</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <ListChat name={"Finn"}
                          image={"https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_24787.png&f=1&nofb=1"}
                          message={"Hey whatsapp NIGGA :v"}
                          description={"jsjsjsjs puto el que lo lea jajaj xd"}
                />
            </IonContent>
        </Layout>
    );
};

export default Chat;
