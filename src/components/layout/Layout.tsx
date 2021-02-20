import React, {FunctionComponent, useEffect} from "react";
import {IonPage} from "@ionic/react";
import Footer from "../footer/Footer";
import * as localStorage from 'local-storage';
import {useHistory} from "react-router-dom";

const Layout: FunctionComponent = ({children}) => {
    const history = useHistory();

    useEffect(()=>{
        if(!localStorage.get('token')){
            history.push('/login')
        }
    },[])

    return (
        <IonPage>
            {children}
            <Footer />
        </IonPage>
    )
}
export default Layout;
