import React, {FunctionComponent, useEffect, useState} from 'react';
import {IonContent, IonHeader, IonList, IonRefresher, IonRefresherContent, IonTitle, IonToolbar} from '@ionic/react';
import './Chat.css';
import Layout from "../../components/layout/Layout";
import {axiosConfig} from "../../components/helpers/axiosConfig";
import ChatItem from "../../components/list-item/ChatItem";
import * as localStorage from "local-storage";


interface User {
    id: string,
    name: string,
    status: boolean,
    profileImage: string,
}

const Chat: FunctionComponent = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [users, setUsers] = useState<User[]>()
    const user: any = localStorage.get('user');
    const getUsers = (event?: CustomEvent) => {
        if (window !== undefined) {
            setLoading(true);
            axiosConfig().get('chats/users')
                .then(({data}) => {
                    setUsers(
                        data.map((user: any) => ({
                            id: user._id,
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
        getUsers();
    }, [])
    return (
        <Layout>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{`${user?.name} ${user?.surname}`}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonRefresher slot="fixed" onIonRefresh={getUsers}>
                    <IonRefresherContent>
                    </IonRefresherContent>
                </IonRefresher>
                <IonList>
                    {
                        users?.map((user) => {
                            return (
                                <ChatItem
                                    key={user.id}
                                    id={user.id}
                                    name={user.name}
                                    image={user.profileImage}
                                    message={''}
                                    description={''}
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
