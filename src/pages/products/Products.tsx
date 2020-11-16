import React, {FunctionComponent, useState} from 'react';
import {IonContent, IonHeader, IonPage, IonSearchbar, IonTitle, IonToolbar, IonButton, IonIcon} from '@ionic/react';
import './Products.css';
import Layout from "../../components/layout/Layout";
import ProductsCard from "../../components/cards/products/Products-card";
import {cart} from 'ionicons/icons';
import './Products.css'

const Products: FunctionComponent = () => {
    const [searchText, setSearchText] = useState('');
    return (
        <Layout>
            <IonHeader>
                <IonToolbar>
                    <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)}/>
                    <IonButton href="/carrito" slot="end" fill="clear">
                        <IonIcon slot="icon-only" icon={cart}/>
                    </IonButton>
                </IonToolbar>

            </IonHeader>
            <IonContent fullscreen>
                <ProductsCard
                    title={"Pruebas rápidas"}
                    image={"https://www.kimirina.org/images/kimirina/servicios/hazte_la_prueba.png"}
                    description={"Corporación Kimirina cuenta con un equipo de promotores debidamente capacitados y habilitados en la prestación de la realización de las pruebas rápidas de VIH por parte del Ministerio de Salud Pública y en la vinculación de las personas conpruebas de tamizaje con resultado Reactivo y/o positivo de VIH a las Unidades de Atención Integral en Salud (UAIS) para su atención, cuidado y tratamiento de la infección por el VIH."}
                    price={"$20"}

                />
            </IonContent>
        </Layout>
    );
};

export default Products;
