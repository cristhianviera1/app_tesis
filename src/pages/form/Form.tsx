import React, {FunctionComponent} from "react";
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonRadio,
    IonRadioGroup,
    IonToolbar
} from "@ionic/react";
import './Form.css'


const Form: FunctionComponent = () => {
    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/profile"/>
                    </IonButtons>

                </IonToolbar>
            </IonHeader>

            <IonList>

                <IonCard>

                    <IonCardContent>
                        <IonRadioGroup>
                            <IonListHeader>
                                <IonLabel className="Text-form">
                                    ¿Tiene alguna ITS?
                                </IonLabel>
                            </IonListHeader>
                            <IonItem>
                                <IonLabel>Si</IonLabel>
                                <IonRadio slot="start" color="success" value="respuesta1"></IonRadio>
                            </IonItem>
                            <IonItem>
                                <IonLabel>No</IonLabel>
                                <IonRadio slot="start" color="tertiary" value="respuesta2"></IonRadio>
                            </IonItem>
                            <IonItem>
                                <IonLabel>En el pasado</IonLabel>
                                <IonRadio slot="start" color="danger" value="respuesta3"></IonRadio>
                            </IonItem>

                        </IonRadioGroup>
                    </IonCardContent>
                </IonCard>

                <IonCard>

                    <IonCardContent>
                        <IonRadioGroup>
                            <IonListHeader>
                                <IonLabel className="Text-form">
                                    Segunda pregunta
                                </IonLabel>
                            </IonListHeader>
                            <IonItem>
                                <IonLabel>respuesta 1</IonLabel>
                                <IonRadio slot="start" color="success" value="respuesta4"></IonRadio>
                            </IonItem>
                            <IonItem>
                                <IonLabel>respuesta 2</IonLabel>
                                <IonRadio slot="start" color="tertiary" value="respuesta5"></IonRadio>
                            </IonItem>
                            <IonItem>
                                <IonLabel>respuesta 3</IonLabel>
                                <IonRadio slot="start" color="danger" value="respuesta6"></IonRadio>
                            </IonItem>

                        </IonRadioGroup>
                    </IonCardContent>
                </IonCard>
                <IonCard>
                    <IonCardContent>
                        <IonRadioGroup>
                            <IonListHeader>
                                <IonLabel className="Text-form">
                                    Tercera pregunta
                                </IonLabel>
                            </IonListHeader>
                            <IonItem>
                                <IonLabel>respuesta 1</IonLabel>
                                <IonRadio slot="start" color="success" value="respuesta"></IonRadio>
                            </IonItem>
                            <IonItem>
                                <IonLabel>respuesta 2</IonLabel>
                                <IonRadio slot="start" color="tertiary" value="respuesta8"></IonRadio>
                            </IonItem>
                            <IonItem>
                                <IonLabel>respuesta 3</IonLabel>
                                <IonRadio slot="start" color="danger" value="respuesta9"></IonRadio>
                            </IonItem>
                        </IonRadioGroup>
                    </IonCardContent>
                </IonCard>
                <IonButton expand="block">Guardar</IonButton>
            </IonList>
        </>
    );
};

export default Form;
