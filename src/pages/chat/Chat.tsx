import React, {FunctionComponent, useEffect, useState} from 'react';
import {IonContent, IonHeader, IonList, IonRefresher, IonRefresherContent, IonTitle, IonToolbar} from '@ionic/react';
import './Chat.css';
import Layout from "../../components/layout/Layout";
import {axiosConfig} from "../../components/helpers/axiosConfig";
import ChatItem from "../../components/list-item/ChatItem";


interface User {
    name: string,
    status: boolean,
    profileImage: string,
}

const Chat: FunctionComponent = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [users, setUsers] = useState<User[]>()
    const getChats = (event?: CustomEvent) => {
        if (window !== undefined) {
            setLoading(true);
            axiosConfig().get('chats/users')
                .then(({data}) => {
                    setUsers(
                        data.map((user: any) => ({
                            name: `${user.name} ${user.surname}`,
                            status: user.status,
                            profileImage: user?.image
                        }))
                    )
                })
                .catch(() => {
                })
                .finally(() => {
                    setLoading(false)
                    event?.detail?.complete();
                })
        }
    }
    useEffect(() => {
        getChats();
    }, [])
    return (
        <Layout>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Chat</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonRefresher slot="fixed" onIonRefresh={getChats}>
                    <IonRefresherContent>
                    </IonRefresherContent>
                </IonRefresher>
                <IonList>
                    {
                        users?.map((user) => {
                            return (
                                <ChatItem
                                    name={user.name}
                                    image={user.profileImage}
                                    message={''}
                                    description={'Todavía no tienes mensajes'}
                                    active={user.status}
                                />
                            );
                        })
                    }
                </IonList>
            </IonContent>
        </Layout>
    );
};

export default Chat;
