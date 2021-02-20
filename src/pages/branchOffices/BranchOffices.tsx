import React, {FunctionComponent, useEffect, useState} from "react";
import Layout from "../../components/layout/Layout";
import {IonContent, IonHeader, IonTitle, IonToolbar} from "@ionic/react";
import {axiosConfig} from "../../components/helpers/axiosConfig";
import BranchOfficeCard from "../../components/cards/branchOffice/BranchOffice-card";

export interface BranchOfficeValues {
    id: string;
    name: string;
    firstAddress: string;
    secondAddress?: string;
    city: string;
    lat: string;
    lng: string;
    email: string;
}

const BranchOffices: FunctionComponent = () => {
    const [branchOffices, setBranchOffices] = useState<BranchOfficeValues[]>()
    const [loading, setLoading] = useState<boolean>(false)

    const getBranchOffices = () => {
        setLoading(true)
        axiosConfig().get('branch-offices')
            .then(({data}) => {
                setBranchOffices(data.map((branchOffice: any) => ({
                    id: branchOffice._id,
                    name: branchOffice.name,
                    firstAddress: branchOffice.address.first_address,
                    secondAddress: branchOffice.address.second_address,
                    city: branchOffice.address.city,
                    lat: branchOffice.address.latitude,
                    lng: branchOffice.address.longitude,
                    email: branchOffice.email,
                })))
            })
            .catch(() => {
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        getBranchOffices()
    }, [])

    return (
        <Layout>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Centros comunitarios</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {
                    branchOffices?.map((branchOffice) => (
                        <BranchOfficeCard
                            id={branchOffice.id}
                            name={branchOffice.name}
                            firstAddress={branchOffice.firstAddress}
                            secondAddress={branchOffice.secondAddress}
                            city={branchOffice.city}
                            lat={branchOffice.lat}
                            lng={branchOffice.lng}
                            email={branchOffice.email}
                        />
                    ))
                }
            </IonContent>
        </Layout>
    );
}
export default BranchOffices;
