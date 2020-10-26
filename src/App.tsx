import React from 'react';
import {ApplicationProvider, IconRegistry,} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import Routes from "./components/routes/Routes";
import { setLocale } from "yup";

export default (): React.ReactFragment => (
    <>
        <IconRegistry icons={EvaIconsPack}/>
        <ApplicationProvider {...eva} theme={eva.light}>
            <Routes />
        </ApplicationProvider>
    </>
);
setLocale({
    mixed:{
        required: "El campo es requerido"
    },
    string:{
        min: "Mínimo ${min} caracteres",
        max: "Máximo ${max} caracteres",
        email: "Ingrese email inválido"
    }
})
