import React, { FunctionComponent, useState } from "react";
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonHeader,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonPage,
    IonSpinner,
    IonText,
    IonToolbar
} from "@ionic/react";
import { Controller, useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import * as yup from "yup";
import { setLocale } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { mailUnreadOutline } from "ionicons/icons";
import './RecoverPassword.css'
import axios from "axios";
import { environment } from "../../enviroment/enviroment";

interface RecoverValues {
    email: string;
}

const RecoverPassword: FunctionComponent = () => {
    const [loading, setLoading] = useState<boolean>(false);


    setLocale({
        mixed: {
            required: "El campo es requerido"
        },
        string: {
            min: "Mínimo ${min} caracteres",
            max: "Máximo ${max} caracteres",
            email: "Ingrese un email válido"
        },
    });

    const validationSchema = yup.object().shape({
        email: yup.string().required().email(),
    })
    const { control, errors, handleSubmit } = useForm<RecoverValues>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            email: '',
        }
    })
    const onSubmit = (data: RecoverValues) => {
        setLoading(true)
        axios.get(`${environment.apiUrl}auth/recover/${data.email}`)
            .then(() => {
                toast.success("Su nueva contraseña será enviada a su correo electrónico.")
            })
            .catch((error) => {
                if (error?.response?.data?.message) {
                    return toast.error(error?.response?.data?.message);
                }
                return toast.error("No se ha podido enviar su contraseña, por favor intentelo más tarde");
            })
            .finally(() => setLoading(false))
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar >
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/login" />
                    </IonButtons>
                    <IonLabel style={{ textAlign: 'center' }}>Recuperar Contraseña</IonLabel>
                </IonToolbar>
            </IonHeader>
            <IonCard style={{ textAlign: 'center' }}>
                <IonCardHeader>
                    <IonIcon size="large" icon={mailUnreadOutline} className="ion-icon" />
                </IonCardHeader>
                <IonCardContent>
                    <IonItem>
                        <IonLabel position="stacked">Ingresa tu email</IonLabel>
                        <Controller
                            name='email'
                            control={control}
                            render={({ onChange, value }) => (
                                <IonInput
                                    value={value}
                                    className="input-recover"
                                    type={'email'}
                                    onIonChange={(e) => onChange(e.detail.value)} />
                            )}
                        />
                        <IonText color="danger">{errors && errors.email?.message}</IonText>
                    </IonItem>

                    <IonButton
                        expand="block"
                        disabled={loading}
                        onClick={handleSubmit(onSubmit)}
                    >
                        {loading ? <IonSpinner name="lines" /> : "Recuperar Contraseña"}
                    </IonButton>
                </IonCardContent>
            </IonCard>
            <ToastContainer />
        </IonPage>
    );
};

export default RecoverPassword;
