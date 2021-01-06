import React, {FunctionComponent, useEffect, useMemo, useRef, useState} from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonContent,
    IonFooter,
    IonHeader,
    IonIcon,
    IonLabel,
    IonList,
    IonPage,
    IonRow,
    IonTextarea,
    IonToolbar
} from '@ionic/react';
import ChatBubble from "../../components/chat/ChatBubble";
import {useLocation} from "react-router-dom";
import {cameraOutline, imageOutline, sendOutline} from "ionicons/icons";
import {environment} from "../../enviroment/enviroment";
import socketIOClient from "socket.io-client";
import * as localStorage from "local-storage";
import moment from "moment";
import {axiosConfig} from "../../components/helpers/axiosConfig";
import './ChatDetail.css';
import {CameraResultType, Plugins} from '@capacitor/core';
import {useHistory} from "react-router";

const {Camera, Photos} = Plugins;

export interface Message {
    type: "text" | "image";
    message: string;
}

interface ChatDetail {
    fromUser: string,
    toUser: string,
    message: Message,
    createdAt: number,
}

const ChatDetail: FunctionComponent = () => {
    const [newMessage, setNewMessage] = useState<string>('')
    const [chatsHistory, setChatsHistory] = useState<ChatDetail[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const socket = useMemo(() => socketIOClient(environment.apiUrl), [])
    const user: any = localStorage.get('user');
    const location: any = useLocation()
    const history = useHistory();
    const contentRef = useRef<HTMLIonContentElement | null>(null);
    const scrollToEnd = () => {
        contentRef.current && contentRef.current.scrollToBottom();
    };

    const getChatsHistory = () => {
        if (window !== undefined) {
            setLoading(true);
            axiosConfig().get(`chats?toUser=${location?.state?.id}`)
                .then(({data}) => {
                    console.log(data);
                    setChatsHistory(data.map((chat: any) => ({
                            fromUser: chat.fromUser,
                            toUser: chat.toUser,
                            message: chat.message,
                            createdAt: chat.createdAt
                        }))
                    )
                })
                .finally(() => setLoading(false))
        }
    }

    useEffect(() => {
        getChatsHistory();
        socket.emit('joinRoom', {
            userFrom: user?._id,
            toUser: location?.state?.id,
        })
        socket.on("msgFromServer", (data: any) => {
            setChatsHistory((prevChats) => [...prevChats, ({
                fromUser: data.fromUser,
                toUser: data.toUser,
                message: data.message,
                createdAt: data.createdAt
            })])

        });
    }, [])
    useEffect(() => {
        scrollToEnd()
    }, [chatsHistory])

    const sendMessage = (message: Message) => {
        socket.emit('msgToServer', {
            userFrom: user?._id,
            toUser: location?.state?.id,
            message: message,
            timeStamp: moment().unix(),
        })
        setNewMessage('');
    }
    const imChatOwner = (fromUser: string) => {
        return fromUser === user?._id;
    }
    const openCamera = () => {
        Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Base64,

        }).then((image) => {
            const res = `data:image/${image.format};base64,${image.base64String}`;
            sendMessage({type: "image", message: res});
        });
    }

    const openGallery = () => {
        Photos.getPhotos({
            quantity: 1
        }).then(({photos}) => {
            console.log(photos)
            //sendMessage({type: "image", message: res});
        })
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonToolbar>
                        <IonButtons slot="start" onClick={() => {
                            socket.close()
                            history.push('/chat'
                            )
                        }}>
                            <IonBackButton/>
                            <IonLabel>{location?.state?.name}</IonLabel>
                        </IonButtons>
                    </IonToolbar>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen ref={contentRef} scrollEvents={true}>
                <IonList>
                    {
                        chatsHistory?.map((chat, index) => <ChatBubble
                            key={index}
                            position={imChatOwner(chat.fromUser)}
                            message={chat.message}
                        />)
                    }
                </IonList>
            </IonContent>
            <IonFooter style={{zIndex: 999, backgroundColor: '#fff'}}>
                <IonRow style={{alignItems: 'flex-end'}}>
                    <IonButton fill={'clear'}
                               onClick={() => {
                                   openCamera()
                               }}>
                        <IonIcon slot="icon-only" icon={cameraOutline}/>
                    </IonButton>
                    <IonButton fill={'clear'}
                               onClick={() => {
                                   openGallery()
                               }}>
                        <IonIcon slot="icon-only" icon={imageOutline}/>
                    </IonButton>
                    <IonTextarea
                        value={newMessage}
                        autoGrow={true}
                        maxlength={500}
                        rows={1}
                        placeholder={'Escribe un nuevo mensaje...'}
                        onIonChange={(e) => setNewMessage(String(e.detail.value))}
                        onSubmit={() => sendMessage({type: 'text', message: newMessage})}
                    />
                    <IonButton fill={'clear'}
                               onClick={() => sendMessage({type: 'text', message: newMessage})}>
                        <IonIcon slot="icon-only" icon={sendOutline}/>
                    </IonButton>
                </IonRow>
            </IonFooter>
        </IonPage>

    );
};

export default ChatDetail;
