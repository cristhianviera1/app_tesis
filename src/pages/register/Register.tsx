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
    IonPage,
    IonSelect,
    IonSelectOption,
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
import {useHistory} from "react-router";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import {environment} from "../../enviroment/enviroment";

interface RegisterValues {
    name: string;
    surname: string;
    email: string;
    birthday: string;
    gender: string;
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
        birthday: yup.string().required(),
        gender: yup.string().required()
    })
    const {control, errors, handleSubmit} = useForm<RegisterValues>({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (data: RegisterValues) => {
        setLoading(true)
        axios.post(`${environment.apiUrl}auth/register`, {
            name: data.name,
            surname: data.surname,
            email: data.email,
            birthday: moment(data.birthday).unix(),
            gender: data.gender,
        })
            .then(() => {
                toast.success("Registrado correctamente, su contraseña será enviada a su correo electrónico.")
            })
            .catch((error) => {
                if (error?.response?.data?.message) {
                    return toast.error(error?.response?.data?.message);
                }
                return toast.error("No se ha podido registrar, por favor intentelo más tarde");
            })
            .finally(() => setLoading(false))
    }

    return (
        <IonPage>
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
                                    autoCapitalize={'words'}
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
                                    autoCapitalize={'words'}
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
                                    type={'email'}
                                    inputMode={'email'}
                                    onIonChange={(e) => onChange(e.detail.value)}/>
                            )}
                        />
                        <IonText color="danger">{errors && errors.email?.message}</IonText>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="floating">Género</IonLabel>
                        <Controller
                            name='gender'
                            control={control}
                            render={({onChange, value}) => (
                                <IonSelect value={value} onIonChange={e => onChange(e.detail.value)}>
                                    <IonSelectOption value="man">Hombre</IonSelectOption>
                                    <IonSelectOption value="woman">Mujer</IonSelectOption>
                                    <IonSelectOption value="other">Otro</IonSelectOption>
                                </IonSelect>
                            )}
                        />
                        <IonText color="danger">{errors && errors.gender?.message}</IonText>

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
        </IonPage>
    );
};

export default Register;
