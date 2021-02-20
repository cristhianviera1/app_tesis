import React, {FunctionComponent, useEffect, useState} from 'react';
import {
    IonAvatar,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonRow,
    IonSpinner,
    IonTitle,
    IonToolbar,
} from '@ionic/react';
import './Profile.css';
import Layout from "../../components/layout/Layout";
import {cameraOutline, logInOutline, repeatOutline, storefrontOutline} from 'ionicons/icons';
import * as localStorage from "local-storage";
import {axiosConfig} from "../../components/helpers/axiosConfig";
import {CameraResultType, Plugins} from '@capacitor/core';
import {toast, ToastContainer} from "react-toastify";
import {useHistory} from "react-router-dom";

const {Camera} = Plugins;

const Profile: FunctionComponent = () => {
    const user: any = localStorage.get('user');
    const [userImage, setUserImage] = useState<string>('')
    const [uploadingImage, setUploadingImage] = useState<boolean>(false)
    const histoy = useHistory()
    const getProfileImage = () => {
        axiosConfig().get('auth/me')
            .then(({data}) => {
                setUserImage(data.image)
            })
            .catch()
    }
    const openCamera = () => {
        Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Base64,

        }).then((image) => {
            const res = `data:image/${image.format};base64,${image.base64String}`;
            setUploadingImage(true)
            axiosConfig().put('users/updateImage', {image: res})
                .then(() => {
                    toast.success('Foto de perfil actualizada exitosamente');
                    getProfileImage();
                })
                .catch(() => toast.error('No se ha podido actualizar la foto de perfil por favor vuelva a intentarlo más tarde'))
                .finally(() => setUploadingImage(false))
        });
    }

    useEffect(() => {
        getProfileImage()
    }, [])

    return (
        <Layout>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Perfil</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <br/>
                <IonRow>
                    <IonAvatar className="center" style={{
                        borderRadius: '50%',
                        width: '200px',
                        height: '200px',
                        position: 'relative',
                        border: '2px solid #3880FF'
                    }}>
                        <img src={userImage ? userImage : 'assets/avatar.svg'} alt={'foto de perfil'}/>
                        {
                            uploadingImage ?
                                <IonSpinner name="circles" className={"upload-image"}/> :
                                <IonIcon icon={cameraOutline}
                                         onClick={() => openCamera()}
                                         className={"upload-image"}
                                />
                        }
                    </IonAvatar>
                </IonRow>
                <IonCardTitle style={{textAlign: 'center'}}>{`${user?.name} ${user?.surname}`}</IonCardTitle>
                <IonCardSubtitle style={{textAlign: 'center'}}>{`${user?.email}`}</IonCardSubtitle>
                <br/>
                <IonList className={"padding"} lines="none">
                    <IonItem color="primary" button={true} onClick={() => histoy.push('/passwordchange')}
                             style={{borderRadius: '15px'}}>
                        <IonLabel>Cambiar contraseña</IonLabel>
                        <IonIcon slot="end" icon={repeatOutline}/>
                    </IonItem>
                    <br/>
                    <IonItem color="primary" button={true} onClick={() => histoy.push('/myShopping')}
                             style={{borderRadius: '15px'}}>
                        <IonLabel>Mis compras</IonLabel>
                        <IonIcon slot="end" icon={storefrontOutline}/>
                    </IonItem>
                    <br/>
                    <IonItem color="primary" button={true} onClick={() => histoy.push('/login')}
                             style={{borderRadius: '15px'}}>
                        <IonLabel>Cerrar sesión</IonLabel>
                        <IonIcon slot="end" icon={logInOutline}/>
                    </IonItem>
                </IonList>
            </IonContent>
        </Layout>
    );
};

export default Profile;
