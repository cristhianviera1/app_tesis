import React, {FunctionComponent, useState} from "react";
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonInput,
    IonItem,
    IonLabel,
    IonDatetime
} from "@ionic/react";
import './Register.css'

const Register: FunctionComponent = () => {
    const [text, setText] = useState<string>();
    const [selectedDate, setSelectedDate] = useState<string>('null');
    const maxDate = "2070";
    const minDate = "1991";

    return (
        <IonCard className="vertical-center">
            <IonCardHeader>
                    <img width="430" height="280" src="https://scontent.fuio1-1.fna.fbcdn.net/v/t1.0-9/58375447_2373798766274390_1995584557549617152_n.png?_nc_cat=106&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeEaYPjcb-Dkxmmvbo3caUswaaNmHV_PxpFpo2YdX8_GkVUuV0VVczY_Jt2ON4p2eyMWn7xajqQBrS8klcaTF95_&_nc_ohc=1_0e9f0H4kAAX_YrfTG&_nc_ht=scontent.fuio1-1.fna&oh=b2b3cc618b9b657b1f307e781c13d8d6&oe=5FC4B25B"/>
                    <IonCardTitle>Registrate! :D</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
                <IonItem>
                        <IonLabel position="floating">Nombre</IonLabel>
                        <IonInput className="input-register" value={text} onIonChange={e => setText(e.detail.value!)} clearInput/>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Apellido</IonLabel>
                    <IonInput className="input-register" value={text} onIonChange={e => setText(e.detail.value!)} clearInput/>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Email</IonLabel>
                    <IonInput className="input-register" value={text} onIonChange={e => setText(e.detail.value!)} clearInput/>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Fecha de nacimiento</IonLabel>
                    <IonDatetime displayFormat="DD/MM/YYYY" min={minDate} max={maxDate} value={selectedDate} onIonChange={e => setSelectedDate(e.detail.value!)}/>
                </IonItem>
            </IonCardContent>
            <IonButton href="/productos" expand="block">Registrate</IonButton>
        </IonCard>
    );
};

export default Register;
