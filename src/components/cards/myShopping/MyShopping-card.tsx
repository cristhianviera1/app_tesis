import React, {FunctionComponent, useState} from "react";
import {IonAlert, IonButton, IonCard, IonCardContent, IonCardSubtitle, IonCardTitle, IonText} from "@ionic/react";
import {MyShoppingValue} from "../../../pages/myShopping/MyShopping";
import moment from "moment";
import {ColorsPeerVoucher} from "./ColorPeerVaucherStatus";
import {axiosConfig} from "../../helpers/axiosConfig";
import {CameraResultType, Plugins} from "@capacitor/core";
import {toast, ToastContainer} from "react-toastify";

const {Camera, Photos} = Plugins;

const MyShoppingCard: FunctionComponent<MyShoppingValue> = ({position, id, voucher, products, total, createdAt}) => {
    const color = ColorsPeerVoucher.find((statues) => statues.status == voucher.statuses[voucher.statuses.length - 1].status);
    const [loading, setLoading] = useState<boolean>(false)
    const [confirmModal, setConfirmModal] = useState<boolean>(false)
    const uploadVoucherImage = (imageVoucher: string) => {
        if (window !== undefined) {
            setLoading(true);
            axiosConfig().put(`shopping-carts/upload-voucher/${id}`, {image: imageVoucher})
                .then(() => {
                    toast.success("Se ha subido exitósamente el comprobante de pago")
                })
                .catch((error) => {
                    if (error?.response?.data?.message) {
                        return toast.error(error?.response?.data?.message);
                    }
                    return toast.error("No se ha subir el comprobante de pago, por favor intentelo más tarde");
                })
                .finally(() => setLoading(false))
        }
    }
    const openCamera = () => {
        Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            resultType: CameraResultType.Base64,

        }).then((image) => {
            const res = `data:image/${image.format};base64,${image.base64String}`;
            uploadVoucherImage(res);
        });
    }

    const openGallery = () => {
        Photos.getPhotos({
            quantity: 1
        }).then(({photos}) => {
            console.log(photos)
            //sendMessage({type: "image", message: res});
        })
    }

    if (!color) {
        return (<IonCard>
            <IonCardContent>
                <IonCardTitle>{`Compra #${position}`}</IonCardTitle>
            </IonCardContent>
        </IonCard>)
    }

    return (
        <IonCard>
            <IonCardContent>
                <IonCardTitle>{`Compra #${position}`}</IonCardTitle>
                <IonCardSubtitle>
                    {'Total: '}<IonText style={{fontWeight: 'bold'}}>${total}</IonText><br/>
                    {`Fecha de compra: ${moment.unix(createdAt).format('DD/MM/YYYY')}`}<br/>
                    {'Estado del voucher: '}<IonText color={color?.color}> {color.status}</IonText>
                </IonCardSubtitle>
            </IonCardContent>
            <IonButton className={"btn"} expand={"block"} onClick={() => {
                setConfirmModal(true)
            }}>
                Subir foto de comprobante de pago
            </IonButton>
            <IonAlert
                isOpen={confirmModal}
                onDidDismiss={() => setConfirmModal(false)}
                header={'Seleccione una fuente'}
                buttons={[
                    {
                        text: 'Galeria',
                        handler: () => {
                            console.log("abrir galeria");
                            openGallery()
                        }
                    },
                    {
                        text: 'Cámara',
                        handler: () => {
                            console.log("Abrir Cámara")
                            openCamera()
                        }
                    }
                ]}
            />
            <ToastContainer/>
        </IonCard>
    );
}
export default MyShoppingCard;
