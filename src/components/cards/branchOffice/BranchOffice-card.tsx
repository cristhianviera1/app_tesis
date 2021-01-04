import React, {FunctionComponent} from "react";
import {BranchOfficeValues} from "../../../pages/branchOffices/BranchOffices";
import {IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle} from "@ionic/react";
import {useHistory} from "react-router-dom";
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';


const BranchOfficeCard: FunctionComponent<BranchOfficeValues> =
    ({
         id,
         name,
         email,
         firstAddress,
         city,
         secondAddress,
         lat,
         lng
     }) => {
        const history = useHistory();
        const googleKey = "AIzaSyB8vjK9e2zkJR0_IaOd_2gsykk78q-O0HU"
        const markerIcon = L.icon({
            iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
            iconUrl: require("leaflet/dist/images/marker-icon.png"),
            shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
        })
        return (
            <IonCard
                key={id}
                style={{margin: "5% 5%", borderRadius: "3%"}}
            >
                <IonCardHeader>
                    <iframe
                        width={"100%"}
                        height="450"
                        frameBorder="0"
                        style={{border: 0}}
                        src={`https://www.google.com/maps/embed/v1/place?key=${googleKey}
                            &q=${lat},${lng}
                            &center=${lat},${lng}
                            &zoom=18
                        `}
                        allowFullScreen
                    />
                    <IonCardTitle>{name}</IonCardTitle>
                    <IonCardSubtitle>{`${city} ${email}`}</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                    {firstAddress}<br/>
                    {secondAddress}
                </IonCardContent>
            </IonCard>);
    }
export default BranchOfficeCard;
