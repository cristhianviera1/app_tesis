import React, {FunctionComponent} from 'react';
import {
    IonAvatar, IonButton,
    IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList, IonListHeader, IonSpinner,
    IonText,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import './Profile.css';
import Layout from "../../components/layout/Layout";
import {logInOutline, readerOutline, repeatOutline, repeat, thumbsUp, eyeOff} from 'ionicons/icons';
import {useHistory} from "react-router-dom";


const Profile: FunctionComponent = () => {
    const history = useHistory()
    return (
        <Layout>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Perfil</IonTitle>
                    <IonButton href="/login" slot="end" fill="clear">
                            <IonLabel>Cerrar sesión</IonLabel>
                        <IonIcon slot="icon-only" icon={logInOutline}/>
                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <br/>
                <IonAvatar className="center" style={{
                    width: "46%",
                    height: '30%'
                }}>
                    <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y"/>
                </IonAvatar>
                <IonCardTitle style={{textAlign: 'center'}}>Alanys Rojas</IonCardTitle>
                <IonCardSubtitle style={{textAlign: 'center'}}>alyfr2000@gmail.com</IonCardSubtitle>
                <br/>
                <IonList className={"padding"}>
                    <IonItem color="primary" button={true} href={"/passwordchange"}  style={{borderRadius:'15px'}}>
                        <IonIcon slot="end" icon={repeatOutline}/>
                        <IonLabel>Cambiar contraseña</IonLabel>
                    </IonItem>
                    <br/>
                    <IonItem color="primary" button={true} href={"/form"} style={{borderRadius:'15px'}}>
                        <IonIcon slot="end" icon={readerOutline}/>
                        <IonLabel>Abrir encuesta</IonLabel>
                    </IonItem>

                </IonList>
            </IonContent>
        </Layout>
    );
};

export default Profile;
