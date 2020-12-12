import React, {FunctionComponent, useState} from "react";
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonDatetime,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonSpinner,
    IonText,
    IonToolbar
} from "@ionic/react";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {setLocale} from 'yup';
import './Register.css'
import {Controller, useForm} from "react-hook-form";
import moment from "moment";
import {axiosConfig} from "../../components/helpers/axiosConfig";
import {useHistory} from "react-router";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface RegisterValues {
    name: string;
    surname: string;
    email: string;
    birthday: string;
}

const Register: FunctionComponent = () => {
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
    const minAge: number = 13;
    const history = useHistory();
    const [loading, setLoading] = useState<boolean>(false);
    const validationSchema = yup.object().shape({
        name: yup.string().required().min(3).max(30),
        surname: yup.string().required().min(3).max(30),
        email: yup.string().email().required(),
        birthday: yup.string().required()
    })
    const {control, errors, handleSubmit} = useForm<RegisterValues>({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (data: RegisterValues) => {
        setLoading(true)
        axiosConfig().post('auth/register', data)
            .then(() => {
                toast.success("Registrado correctamente, su contraseña será enviada a su correo electrónico.")
            })
            .catch((error) => {
                if(error?.response?.data?.message){
                    return toast.error(error?.response?.data?.message);
                }
                return toast.error("No se ha podido registrar, por favor intentelo más tarde");
            })
            .finally(() => setLoading(false))
    }

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/login"/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonCard style={{textAlign: 'center'}}>
                <IonCardHeader>
                    <IonCardTitle>Registrate</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <IonItem>
                        <IonLabel position="floating">Nombre</IonLabel>
                        <Controller
                            name='name'
                            control={control}
                            render={({onChange, value}) => (
                                <IonInput
                                    value={value}
                                    className="input-register"
                                    type={'email'}
                                    onIonChange={(e) => onChange(e.detail.value)}/>
                            )}
                        />
                        <IonText color="danger">{errors && errors.name?.message}</IonText>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Apellido</IonLabel>
                        <Controller
                            name='surname'
                            control={control}
                            render={({onChange, value}) => (
                                <IonInput
                                    value={value}
                                    autoCapitalize={'on'}
                                    className="input-register"
                                    type={'email'}
                                    onIonChange={(e) => onChange(e.detail.value)}/>
                            )}
                        />
                        <IonText color="danger">{errors && errors.surname?.message}</IonText>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Email</IonLabel>
                        <Controller
                            name='email'
                            control={control}
                            render={({onChange, value}) => (
                                <IonInput
                                    value={value}
                                    autoCapitalize={'off'}
                                    className="input-register"
                                    type={'email'}
                                    inputMode={'email'}
                                    onIonChange={(e) => onChange(e.detail.value)}/>
                            )}
                        />
                        <IonText color="danger">{errors && errors.email?.message}</IonText>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Fecha de nacimiento</IonLabel>
                        <Controller
                            name='birthday'
                            control={control}
                            render={({onChange, value}) => (
                                <IonDatetime
                                    displayFormat="YYYY/MM/DD"
                                    max={String(moment().subtract(minAge, 'years').format("YYYY-MM-YY"))}
                                    value={value}
                                    onIonChange={(e) => {
                                        onChange(e.detail.value);
                                    }}
                                />
                            )}
                        />
                        <IonText color="danger">{errors && errors.birthday?.message}</IonText>

                    </IonItem>
                </IonCardContent>
                <IonButton onClick={handleSubmit(onSubmit)} expand="block">
                    {loading ? <IonSpinner name="lines"/> : "Registrarse"}
                </IonButton>
            </IonCard>
            <ToastContainer/>
        </>
    );
};

export default Register;
