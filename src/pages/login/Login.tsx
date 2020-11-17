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
    IonSpinner,
    IonText,
} from '@ionic/react';
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {setLocale} from 'yup';
import axios from 'axios';
import {environment} from "../../enviroment/enviroment";
import * as localStorage from "local-storage";
import './Login.css'
import {useHistory} from "react-router-dom";

interface LoginValues {
    email: string;
    password: string;
}

const Login: FunctionComponent = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [loginError, setLoginError] = useState<string>()
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
        email: yup.string().required().email(),
        password: yup.string().required()
    })
    const {control, handleSubmit, errors} = useForm<LoginValues>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })
    const onSubmit = (data: LoginValues) => {
        setLoading(true);
        axios.post(`${environment.apiUrl}auth/sign-in`, data)
            .then(({data}) => {
                localStorage.set('token', data.accessToken);
                history.push('/products')
            })
            .catch((error) => {
                setLoginError("Email o contraseña incorrectos")
            })
            .finally(() => setLoading(false))
    }

    return (
        <IonCard style={{textAlign: 'center'}}>
            <IonCardHeader>
                <img width="430" height="280"
                     src="https://scontent.fuio1-1.fna.fbcdn.net/v/t1.0-9/58375447_2373798766274390_1995584557549617152_n.png?_nc_cat=106&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeEaYPjcb-Dkxmmvbo3caUswaaNmHV_PxpFpo2YdX8_GkVUuV0VVczY_Jt2ON4p2eyMWn7xajqQBrS8klcaTF95_&_nc_ohc=1_0e9f0H4kAAX_YrfTG&_nc_ht=scontent.fuio1-1.fna&oh=b2b3cc618b9b657b1f307e781c13d8d6&oe=5FC4B25B"/>
                <IonCardTitle>Login</IonCardTitle>

            </IonCardHeader>
            <IonCardContent>
                <IonItem>
                    <IonLabel position="floating">Email</IonLabel>
                    <Controller
                        name='email'
                        control={control}
                        render={({onChange, value}) => (
                            <IonInput
                                value={value}
                                className="input-register"
                                type={'email'}
                                onIonChange={(e) => onChange(e.detail.value)}/>
                        )}
                    />
                    <IonText color="danger">{errors && errors.email?.message}</IonText>
                </IonItem>
                <IonItem>
                    <IonLabel position="floating">Contraseña</IonLabel>
                    <Controller
                        name='password'
                        control={control}
                        render={({onChange, value}) => (
                            <IonInput
                                value={value}
                                className="input-register"
                                type={'password'}
                                onIonChange={(e) => onChange(e.detail.value)}/>
                        )}
                    />
                    <IonText color="danger">{errors && errors.password?.message}</IonText>
                </IonItem>
                {loginError && <IonText color="danger">{loginError}</IonText>}
                <IonButton
                    onClick={handleSubmit(onSubmit)}
                    expand="block"
                    disabled={loading}
                >
                    {loading ? <IonSpinner name="lines"/> : "Iniciar Sesión"}
                </IonButton>

                <IonButton onClick={() => {
                    history.push('/register')
                }} expand="block">Registrate</IonButton>
            </IonCardContent>
        </IonCard>
    );
};

export default Login;
