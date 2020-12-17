import React, {FunctionComponent, useState} from "react";
import {
    IonButton,
    IonContent,
    IonFooter,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonRow,
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
import {eye, eyeOff} from "ionicons/icons";

interface LoginValues {
    email: string;
    password: string;
}

const Login: FunctionComponent = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [loginError, setLoginError] = useState<string>()
    const [secureEntry, setSecureEntry] = useState<boolean>(true);
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
            .catch(() => {
                setLoginError("Email o contraseña incorrectos")
            })
            .finally(() => setLoading(false))
    }

    return (
        <IonContent style={{textAlign: 'center'}}>
            <img style={{height: '300px', width: '300px'}} src='assets/logo_circle.png'/>
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
                        <IonRow style={{width: '100%'}}>
                            <IonInput
                                value={value}
                                className="input-register"
                                type={secureEntry ? 'password' : 'text'}
                                onIonChange={(e) => onChange(e.detail.value)}
                            />
                            <IonButton fill={'clear'} style={{textAlign: 'left'}}
                                       onClick={() => setSecureEntry(!secureEntry)}>
                                {
                                    secureEntry ?
                                        <IonIcon slot="icon-only" icon={eye}/> :
                                        <IonIcon slot="icon-only" icon={eyeOff}/>
                                }

                            </IonButton>
                        </IonRow>
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

            <IonFooter>
                ¿No tienes una cuenta?<a onClick={() => history.push('/register')}>{" Registrarse"}</a>
                <br/>
                <a onClick={() => history.push('/recoverpassword')}>Recuperar contraseña</a>
            </IonFooter>
        </IonContent>
    );
};

export default Login;
