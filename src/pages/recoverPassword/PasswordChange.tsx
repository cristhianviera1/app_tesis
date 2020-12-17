import React, {FunctionComponent, useState} from "react";
import {setLocale} from "yup";
import * as yup from "yup";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {axiosConfig} from "../../components/helpers/axiosConfig";
import {toast, ToastContainer} from "react-toastify";
import {
    IonBackButton, IonButton,
    IonButtons,
    IonCard, IonCardContent,
    IonCardHeader,
    IonHeader,
    IonIcon, IonInput, IonItem,
    IonLabel, IonSpinner, IonText,
    IonToolbar
} from "@ionic/react";
import {lockClosedOutline} from "ionicons/icons";
import './PasswordChange.css'

interface PasswordChangeValues {
    password: string;
    newPassword: string;
    newPassword2: string;
}

const PasswordChange: FunctionComponent = () => {
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
    const {control, errors, handleSubmit} = useForm<PasswordChangeValues>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            password: '',
            newPassword: '',
            newPassword2: '',
        }
    })
    const onSubmit = (data: PasswordChangeValues) => {
        setLoading(true)
        axiosConfig().post('auth/register', data)
            .then(() => {
                toast.success("Su nueva contraseña será enviada a su correo electrónico.")
            })
            .catch((error) => {
                if(error?.response?.data?.message){
                    return toast.error(error?.response?.data?.message);
                }
                return toast.error("No se ha podido enviar su contraseña, por favor intentelo más tarde");
            })
            .finally(() => setLoading(false))
    }

    return (
        <>
            <IonHeader>
                <IonToolbar >
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/profile"/>
                    </IonButtons>

                </IonToolbar>
            </IonHeader>
            <br/>
            <IonCard style={{textAlign: 'center'}}>
                <IonCardHeader>

                    <IonIcon  size="large" icon={lockClosedOutline} className="ion-icon"/>
                </IonCardHeader>
                <IonCardContent>
                    <IonItem>
                        <IonLabel position="stacked">Ingresa tu contraseña</IonLabel>
                        <Controller
                            name='password'
                            control={control}
                            render={({onChange, value}) => (
                                <IonInput
                                    value={value}
                                    className="input-recover"
                                    type={'text'}
                                    onIonChange={(e) => onChange(e.detail.value)}/>
                            )}
                        />
                        <IonText color="danger">{errors && errors.password?.message}</IonText>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Ingresa tu nueva contraseña</IonLabel>
                        <Controller
                            name='newPassword'
                            control={control}
                            render={({onChange, value}) => (
                                <IonInput
                                    value={value}
                                    className="input-recover"
                                    type={'text'}
                                    onIonChange={(e) => onChange(e.detail.value)}/>
                            )}
                        />
                        <IonText color="danger">{errors && errors.newPassword?.message}</IonText>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Repite tu nueva contraseña</IonLabel>
                        <Controller
                            name='newPassword2'
                            control={control}
                            render={({onChange, value}) => (
                                <IonInput
                                    value={value}
                                    className="input-recover"
                                    type={'text'}
                                    onIonChange={(e) => onChange(e.detail.value)}/>
                            )}
                        />
                        <IonText color="danger">{errors && errors.newPassword2?.message}</IonText>
                    </IonItem>
                    <IonButton
                        expand="block"
                        disabled={loading}
                        onClick={handleSubmit(onSubmit)}
                    >
                        {loading ? <IonSpinner name="lines"/> : "Cambiar Contraseña"}
                    </IonButton>

                    <ToastContainer />
                </IonCardContent>
            </IonCard>
        </>
    );
};

export default PasswordChange;
