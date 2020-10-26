import {SafeAreaView, StyleSheet, TouchableWithoutFeedback} from "react-native";
import React, {useState} from "react";
import {Button, Card, Icon, Input} from "@ui-kitten/components";
import {Controller, useForm} from "react-hook-form";
import normalize from 'react-native-normalize';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import axios from 'axios';
/*import {PUBLIC_URL} from "react-native-dotenv"*/
import AsyncStorage from "@react-native-async-storage/async-storage";

interface LoginValues {
    email: string;
    password: string;
}

const Login = () => {
    const [secureTextEntry, setTextEntry] = useState<boolean>(true)
    const [loading, setLoading] = useState<boolean>(false);
    const validationSchema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required()
    })
    const {control, errors, handleSubmit, watch} = useForm<LoginValues>({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = (data: LoginValues) => {
        setLoading(true)
        axios.post('http://localhost:3000/' + "auth/sign-in", data)
            .then(({data}) => {
                console.log(data)
                AsyncStorage.setItem('token', data?.token)
            })
            .catch(() => setLoading(false))
    }

    return (
        <SafeAreaView style={styles.container}>
            <Card style={styles.card}>
                <Controller
                    name={'email'}
                    control={control}
                    render={({onBlur, onChange, value}) => (
                        <Input
                            label={'Correo electrónico'}
                            value={value}
                            onBlur={onBlur}
                            status={errors.email && 'danger'}
                            style={styles.input}
                            onChangeText={(text) => onChange(text)}
                            caption={errors.email?.message && String(errors.email?.message)}
                        />
                    )}
                />
                <Controller
                    name={'password'}
                    control={control}
                    render={({onBlur, onChange, value}) => (
                        <Input
                            label={'Contraseña'}
                            value={value}
                            onBlur={onBlur}
                            style={styles.input}
                            status={errors.password && 'danger'}
                            onChangeText={(text) => onChange(text)}
                            caption={errors.password?.message}
                            secureTextEntry={secureTextEntry}
                            accessoryRight={(props: any) =>
                                <TouchableWithoutFeedback onPress={() => setTextEntry(!secureTextEntry)}>
                                    <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
                                </TouchableWithoutFeedback>
                            }
                        />
                    )}

                />
                <Button
                    status="primary"
                    onPress={handleSubmit(onSubmit)}

                    size={'medium'}
                >
                    Iniciar Sesión
                </Button>
            </Card>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        width: normalize(300),
    },
    input: {
        marginBottom: normalize(10)
    }
})
export default Login;
