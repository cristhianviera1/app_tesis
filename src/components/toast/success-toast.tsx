import React, {FunctionComponent} from "react";
import {IonToast} from "@ionic/react";

interface InfoToast {
    visible: boolean;
    description: string;
    duration: number;

    onDismiss(): void;

    type: 'success' | 'warning' | 'danger';
}

const InfoToast: FunctionComponent<InfoToast> = ({visible, description, duration, onDismiss, type}) => {
    return (
        <IonToast
            isOpen={visible}
            color={type}
            onDidDismiss={() => onDismiss()}
            message={description}
            duration={duration}
        />
    );
}
export default InfoToast;
