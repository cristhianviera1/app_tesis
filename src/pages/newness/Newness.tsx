import React, {FunctionComponent} from 'react';
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar} from '@ionic/react';
import './Newness.css';
import NewnessCard from "../../components/cards/newness/Newness-card";
import Layout from "../../components/layout/Layout";

const Newness: FunctionComponent = () => {
    return (
        <Layout>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Noticias</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <NewnessCard
                    title={"Pandemia de COVID-19"}
                    image={"https://www.kimirina.org/images/kimirina/articulos/infodemic_960.jpg"}
                    description={"NUEVA YORK, 23 de septiembre 2020—La Organización Mundial de la Salud (OMS), junto con las Naciones Unidas, los organismos especializados y los asociados, pidió hoy a los países que elaboren y apliquen planes de acción para promover la difusión oportuna de información de base científica y evitar la difusión de información falsa, respetando al mismo tiempo la libertad de expresión."}
                    link={"https://www.kimirina.org/index.php"}
                />
            </IonContent>
        </Layout>
    );
};

export default Newness;
