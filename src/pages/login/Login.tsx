import {FunctionComponent} from "react";
import React, { useState }  from 'react';
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonItem,
    IonLabel,
    IonInput,
    IonHeader, IonToolbar, IonTitle, IonContent, IonPage
} from '@ionic/react';

const Login: FunctionComponent = () => {
    const [text, setText] = useState<string>();

    return (
        <IonCard className="vertical-center">
            <IonCardHeader>
                <img width="430" height="280" src="https://scontent.fuio1-1.fna.fbcdn.net/v/t1.0-9/58375447_2373798766274390_1995584557549617152_n.png?_nc_cat=106&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeEaYPjcb-Dkxmmvbo3caUswaaNmHV_PxpFpo2YdX8_GkVUuV0VVczY_Jt2ON4p2eyMWn7xajqQBrS8klcaTF95_&_nc_ohc=1_0e9f0H4kAAX_YrfTG&_nc_ht=scontent.fuio1-1.fna&oh=b2b3cc618b9b657b1f307e781c13d8d6&oe=5FC4B25B"/>
                    <IonCardTitle>Login</IonCardTitle>

            </IonCardHeader>
            <IonCardContent >
                <IonItem>
                    <IonLabel position="floating">Email</IonLabel>
                    <IonInput className="input-register" value={text} onIonChange={e => setText(e.detail.value!)} clearInput/>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Contraseña</IonLabel>
                    <IonInput className="input-register" value={text} onIonChange={e => setText(e.detail.value!)} clearInput/>
                </IonItem>
                <IonButton href="/productos" expand="block">Sign in</IonButton>
                <IonButton href="/registro" expand="block">Registrate</IonButton>
            </IonCardContent>

        </IonCard>
    );
};

export default Login;
