import React, {FunctionComponent, useState} from 'react';
import {
    IonAvatar,
    IonCard,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonText,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import './Profile.css';
import Layout from "../../components/layout/Layout";
import {key, mail, repeat, thumbsUp} from 'ionicons/icons';


const Profile: FunctionComponent = () => {
    return (
        <Layout>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Perfil</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent >
                <IonCard>
                    <IonAvatar className="center" style={{
                        width: "30%",
                        height: '30%'
                    }}>
                        <img
                            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.onlinewebfonts.com%2Fsvg%2Fimg_24787.png&f=1&nofb=1"/>
                    </IonAvatar>
                    <IonText style={{textAlign:'center'}}>
                        <h3>Alanys Rojas</h3>
                    </IonText>
                </IonCard>
                <IonCard>

                    <IonList>
                        <IonItem>
                            <IonIcon icon={mail}/>
                            <IonLabel>alyfr2000@gmail.com</IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonIcon icon={key}/>
                            <IonLabel>Cambiar Contraseña</IonLabel>
                        </IonItem>
                        <IonItem >
                            <IonIcon icon={repeat}/>
                            <IonLabel>Cambiar correo</IonLabel>
                        </IonItem>
                        <IonItem href="/formulario">
                            <IonIcon icon={thumbsUp}/>
                            <IonLabel>Ayudanos con la encuesta</IonLabel>
                        </IonItem>



                    </IonList>
                </IonCard>
            </IonContent>
        </Layout>
    );
};

export default Profile;
