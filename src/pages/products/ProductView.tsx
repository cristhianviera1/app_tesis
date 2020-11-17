import React, {FunctionComponent, useState} from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonHeader,
    IonLabel,
    IonToolbar
} from '@ionic/react';
import './Products.css';

const ProductView: FunctionComponent = () => {
    const [searchText, setSearchText] = useState('');
    return (
        <>
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonBackButton defaultHref="/products"/>
                </IonButtons>
                <IonLabel>Prep</IonLabel>
            </IonToolbar>
        </IonHeader>
    <IonCard className={"product-card"}>
        <IonCardHeader>
            <img width="100%" height="100%" src="https://www.kimirina.org/images/kimirina/servicios/hazte_la_prueba.png"/>
            <IonCardSubtitle>30</IonCardSubtitle>
            <IonCardTitle>Prep</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
            Corporación Kimirina cuenta con un equipo de promotores debidamente capacitados y habilitados en la prestación de la realización de las pruebas rápidas de VIH por parte del Ministerio de Salud Pública y en la vinculación de las personas conpruebas de tamizaje con resultado Reactivo y/o positivo de VIH a las Unidades de Atención Integral en Salud (UAIS) para su atención, cuidado y tratamiento de la infección por el VIH.
            Corporación Kimirina cuenta con un equipo de promotores debidamente capacitados y habilitados en la prestación de la realización
            Corporación Kimirina cuenta con un equipo de promotores debidamente capacitados y habilitados en la prestación de la realización
            Corporación Kimirina cuenta con un equipo de promotores debidamente capacitados y habilitados en la prestación de la realización
            Corporación Kimirina cuenta con un equipo de promotores debidamente capacitados y habilitados en la prestación de la realización
            Corporación Kimirina cuenta con un equipo de promotores debidamente capacitados y habilitados en la prestación de la realización
            Corporación Kimirina cuenta con un equipo de promotores debidamente capacitados y habilitados en la prestación de la realización
            Corporación Kimirina cuenta con un equipo de promotores debidamente capacitados y habilitados en la prestación de la realización
            Corporación Kimirina cuenta con un equipo de promotores debidamente capacitados y habilitados en la prestación de la realización
            Corporación Kimirina cuenta con un equipo de promotores debidamente capacitados y habilitados en la prestación de la realización Corporación Kimirina cuenta con un equipo de promotores debidamente capacitados y habilitados en la prestación de la realización
            Corporación Kimirina cuenta con un equipo de promotores debidamente capacitados y habilitados en la prestación de la realización
            Corporación Kimirina cuenta con un equipo de promotores debidamente capacitados y habilitados en la prestación de la realización
            Corporación Kimirina cuenta con un equipo de promotores debidamente capacitados y habilitados en la prestación de la realización
            Corporación Kimirina cuenta con un equipo de promotores debidamente capacitados y habilitados en la prestación de la realización


        </IonCardContent>
        <IonButton className={"btn"} expand={"block"} color="success" href="/login">Comprar</IonButton>
    </IonCard>
            </>
    );
};

export default ProductView;
