import React, {FunctionComponent, useEffect, useState} from 'react';
import {IonContent, IonHeader, IonTitle, IonToolbar} from '@ionic/react';
import './Newness.css';
import NewnessCard from "../../components/cards/newness/Newness-card";
import Layout from "../../components/layout/Layout";
import {axiosConfig} from "../../components/helpers/axiosConfig";

interface NewnessCard {
    title: string;
    image: string;
    description: string;
    link: string;
}

const Newness: FunctionComponent = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [newness, setNewness] = useState<NewnessCard[]>();

    const getNewness = () => {
        setLoading(false)
        axiosConfig().get('newness')
            .then(({data}) => {
                console.log(data);
                setNewness(data.map((newness: any) => ({
                    title: newness.title,
                    image: newness.image,
                    description: newness.description,
                    link: newness.link,
                })))
            })
            .catch()
            .finally(() => setLoading(true))
    }

    useEffect(() => {
        getNewness();
    }, [])
    return (
        <Layout>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Noticias</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {
                    newness?.map((newness, index) =>
                        <NewnessCard
                            key={index}
                            title={newness.title}
                            image={newness.image}
                            description={newness.description}
                            link={newness.link}
                        />
                    )
                }
            </IonContent>
        </Layout>
    );
};

export default Newness;
