import React, {FunctionComponent, useState} from "react";
import * as yup from "yup";
import {setLocale} from "yup";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {axiosConfig} from "../../components/helpers/axiosConfig";
import {toast, ToastContainer} from "react-toastify";
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
    IonRow,
    IonSpinner,
    IonText,
    IonToolbar
} from "@ionic/react";
import {eye, eyeOff, lockClosedOutline} from "ionicons/icons";
import './PasswordChange.css'
import {useHistory} from "react-router-dom";

interface PasswordChangeValues {
    password: string;
    newPassword: string;
    newPasswordRepeat: string;
}

const PasswordChange: FunctionComponent = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [passwordSecure, setPasswordSecure] = useState<boolean>(true)
    const [newPassword, setNewPassword] = useState<boolean>(true)
    const [repeatPassword, setRepeatPassword] = useState<boolean>(true)
    const history = useHistory();


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
        password: yup.string().required(),
        newPassword: yup.string().required(),
        newPasswordRepeat: yup.string().required(),
    })
    const {control, errors, handleSubmit, reset} = useForm<PasswordChangeValues>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            password: '',
            newPassword: '',
            newPasswordRepeat: '',
        }
    })
    const onSubmit = (data: PasswordChangeValues) => {
        setLoading(true)
        axiosConfig().put(`users/updatePassword`, {
            oldPassword: data.password,
            newPassword: data.newPasswordRepeat,
        })
            .then(() => {
                reset({password:'',newPasswordRepeat:'',newPassword:''})
                toast.success("Su contraseña ha sido actualizada exitosamente.");
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
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/profile"/>
                    </IonButtons>

                </IonToolbar>
            </IonHeader>
            <br/>
            <IonCard style={{textAlign: 'center'}}>
                <IonCardHeader>

                    <IonIcon size="large" icon={lockClosedOutline} className="ion-icon"/>
                </IonCardHeader>
                <IonCardContent>
                    <IonItem>
                        <IonLabel position="stacked">Ingresa tu actual contraseña</IonLabel>
                        <Controller
                            name='password'
                            control={control}
                            render={({onChange, value}) => (
                                <IonRow style={{width: '100%'}}>
                                    <IonInput
                                        value={value}
                                        className="input-recover"
                                        type={passwordSecure ? 'password' : 'text'}
                                        onIonChange={(e) => onChange(e.detail.value)}/>
                                    <IonButton fill={'clear'} onClick={() => setPasswordSecure(!passwordSecure)}>
                                        {
                                            passwordSecure ?
                                                <IonIcon slot="icon-only" icon={eye}/> :
                                                <IonIcon slot="icon-only" icon={eyeOff}/>
                                        }

                                    </IonButton>
                                </IonRow>
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
                                <IonRow style={{width: '100%'}}>
                                    <IonInput
                                        value={value}
                                        className="input-recover"
                                        type={newPassword ? 'password' : 'text'}
                                        onIonChange={(e) => onChange(e.detail.value)}/>
                                    <IonButton fill={'clear'} onClick={() => setNewPassword(!newPassword)}>
                                        {
                                            newPassword ?
                                                <IonIcon slot="icon-only" icon={eye}/> :
                                                <IonIcon slot="icon-only" icon={eyeOff}/>
                                        }

                                    </IonButton>
                                </IonRow>
                            )}
                        />
                        <IonText color="danger">{errors && errors.newPassword?.message}</IonText>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked">Repite tu nueva contraseña</IonLabel>
                        <Controller
                            name='newPasswordRepeat'
                            control={control}
                            render={({onChange, value}) => (
                                <IonRow style={{width: '100%'}}>
                                    <IonInput
                                        value={value}
                                        className="input-recover"
                                        type={repeatPassword ? 'password' : 'text'}
                                        onIonChange={(e) => onChange(e.detail.value)}/>
                                    <IonButton fill={'clear'} onClick={() => setRepeatPassword(!repeatPassword)}>
                                        {
                                            repeatPassword ?
                                                <IonIcon slot="icon-only" icon={eye}/> :
                                                <IonIcon slot="icon-only" icon={eyeOff}/>
                                        }

                                    </IonButton>
                                </IonRow>
                            )}
                        />
                        <IonText color="danger">{errors && errors.newPasswordRepeat?.message}</IonText>
                    </IonItem>
                    <IonButton
                        expand="block"
                        disabled={loading}
                        onClick={handleSubmit(onSubmit)}
                    >
                        {loading ? <IonSpinner name="lines"/> : "Cambiar Contraseña"}
                    </IonButton>

                </IonCardContent>
            </IonCard>
            <ToastContainer/>
        </IonPage>
    );
};

export default PasswordChange;
