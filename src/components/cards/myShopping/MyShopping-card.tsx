import React, {FunctionComponent, useState} from "react";
import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCol,
    IonIcon,
    IonItem,
    IonLabel,
    IonRow,
    IonSpinner,
    IonText
} from "@ionic/react";
import {MyShoppingValue} from "../../../pages/myShopping/MyShopping";
import moment from "moment";
import {ColorsPeerVoucher} from "./ColorPeerVaucherStatus";
import {axiosConfig} from "../../helpers/axiosConfig";
import {CameraResultType, Plugins} from "@capacitor/core";
import {toast} from "react-toastify";
import {arrowDownOutline, arrowUpOutline, informationCircleOutline} from "ionicons/icons";
import {useHistory} from "react-router-dom";
import Viewer from "react-viewer";

const {Camera, Photos} = Plugins;

interface MyShoppingCardValues {
    initialValues: MyShoppingValue;

    onSend(): void;
}

const MyShoppingCard: FunctionComponent<MyShoppingCardValues> = ({initialValues, onSend}) => {
    const {position, id, voucher, products, total, createdAt} = initialValues;
    const color = ColorsPeerVoucher.find((statues) => statues.status == voucher.statuses[voucher.statuses.length - 1].status);
    const [loading, setLoading] = useState<boolean>(false)
    const [showProducts, setShowProducts] = useState<boolean>(false);
    const [viewerImage, setViewerImage] = useState<boolean>(false)
    const history = useHistory();

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
                .finally(() => {
                    setLoading(false);
                    onSend();
                })
        }
    }
    const openCamera = () => {
        Camera.getPhoto({
            quality: 90,
            allowEditing: false,
            resultType: CameraResultType.Base64,

        }).then((image) => {
            const res = `data:image/${image.format};base64,${image.base64String}`;
            uploadVoucherImage(res);
        });
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
                    {'Total: '}<IonText style={{fontWeight: 'bold'}}>${total?.toFixed(2)}</IonText><br/>
                    {`Fecha de compra: ${moment.unix(createdAt).format('DD/MM/YYYY')}`}<br/>
                    {'Estado del voucher: '}<IonText color={color?.color}> {color.status}</IonText>
                </IonCardSubtitle>
                {voucher?.image &&
                <div style={{width: '100%'}}>
                    <img src={voucher.image} alt={'Comprobante'} width={'100px'} height={'130px'}
                         style={{borderRadius: '10%', marginTop:'2%'}}
                         onClick={() => setViewerImage(true)}/>
                </div>
                }
                <IonButton fill={'clear'} onClick={() => setShowProducts(!showProducts)}>
                    {showProducts ? "Ocultar productos " : "Mostrar Productos"}
                    {
                        showProducts ?
                            <IonIcon slot="icon-only" icon={arrowUpOutline}/> :
                            <IonIcon slot="icon-only" icon={arrowDownOutline}/>
                    }
                </IonButton>
                {
                    showProducts && products.map((product, index) =>
                        <IonItem style={{width: '100%'}} key={index}>
                            <IonRow style={{width: '100%'}}>
                                <IonCol size={'10'}>
                                    <IonLabel>
                                        <h4
                                            style={{
                                                fontWeight: "bold",
                                                whiteSpace: "pre-wrap",
                                            }}
                                        >
                                            {product.name}
                                        </h4>
                                        <p style={{
                                            whiteSpace: "pre-wrap"
                                        }}>{`x ${product.quantity} | $${product.quantity * product.price}`}</p>
                                    </IonLabel>
                                </IonCol>
                                <IonCol size={'2'}>
                                    <IonButton
                                        fill="clear"
                                        onClick={() => history.push('/productDetail', product.id)}
                                    >
                                        <IonIcon
                                            slot="icon-only"
                                            icon={informationCircleOutline}
                                        />
                                    </IonButton>
                                </IonCol>
                            </IonRow>
                        </IonItem>
                    )
                }

            </IonCardContent>
            {
                voucher.statuses[voucher.statuses.length - 1].status === "pendiente comprobante" &&
                <IonButton disabled={loading} className={"btn"} expand={"block"} onClick={() => openCamera()}>
                    {loading ? <IonSpinner name="lines"/> : <IonText style={{fontSize:'12px'}}>Subir foto de comprobante de pago</IonText>}
                </IonButton>
            }{
                voucher.statuses[voucher.statuses.length - 1].status === "denegado" &&
                <IonButton disabled={loading} className={"btn"} expand={"block"} onClick={() => openCamera()}>
                    {loading ? <IonSpinner name="lines"/> : <IonText style={{fontSize:'12px'}}>Subir foto de comprobante de pago</IonText>}
                </IonButton>
            }
            <Viewer
                visible={viewerImage}
                onClose={() => setViewerImage(false)}
                changeable={false}
                scalable={false}
                noResetZoomAfterChange={true}
                showTotal={false}
                noNavbar={true}
                noImgDetails={true}
                images={[{
                    src: voucher?.image,
                }]}
            />
        </IonCard>
    );
}
export default MyShoppingCard;
