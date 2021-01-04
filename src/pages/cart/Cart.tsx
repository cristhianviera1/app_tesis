import React, {FunctionComponent, useEffect, useState} from "react";
import {IonAlert, IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonToolbar} from "@ionic/react";
import CartCard from "../../components/cards/cart/Cart-card";
import useGlobal from "../../hooks/globalShoppingCart";
import Layout from "../../components/layout/Layout";
import {axiosConfig} from "../../components/helpers/axiosConfig";
import {toast, ToastContainer} from "react-toastify";

const Cart: FunctionComponent = () => {
    const [globalState] = useGlobal();
    const [loading, setLoading] = useState<boolean>(false)
    const [confirmModal, setConfirmModal] = useState<boolean>(false);
    const [totalAmount, setTotalAmount] = useState<number>(0)

    const submitProducts = () => {
        if (window !== undefined) {
            setLoading(true)
            axiosConfig().post('shopping-carts', {
                products: globalState.shoppingCart.map((product) => ({
                    productID: product.id,
                    quantity: product.quantity
                }))
            })
                .then(() => {
                    return toast.success("Su solicitud ha sido enviada con éxito, por favor suba el comprobante de compra desde su perfil en la opción de compras realizadas");
                })
                .catch((error) => {
                    if (error?.response?.data?.message) {
                        return toast.error(error?.response?.data?.message);
                    }
                    return toast.error("No se ha podido terminar la solicitud, por favor intentelo más tarde");
                })
                .finally(() => setLoading(false))
        }
    }

    useEffect(() => {
        let totalOfProducts = 0;
        globalState.shoppingCart.map((product) => {
            totalOfProducts += (product.price * product.quantity);
        })
        setTotalAmount(totalOfProducts);
    }, [globalState])

    if (globalState.shoppingCart.length <= 0) {
        return (
            <Layout>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton text={'Tus compras'} defaultHref="/products"/>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <div style={{
                        'position': 'absolute',
                        'left': '50%',
                        'top': '50%',
                        'transform': 'translate(-50%, -50%)',
                    }}>
                        <img src={'assets/no-product-found.png'} alt={'Aún no has agregado productos'}/>
                    </div>
                </IonContent>
            </Layout>
        );
    }

    return (
        <Layout>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton text={'Tus compras'} defaultHref="/products"/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {
                    globalState.shoppingCart.map((product) => (
                        <CartCard
                            id={product.id}
                            name={product.name}
                            image={product.image}
                            detail={product.detail}
                            quantity={product.quantity}
                        />
                    ))
                }

                <IonButton className={"btn"}
                           expand={"block"}
                           onClick={() => setConfirmModal(true)}>
                    Confirmar compra
                </IonButton>
                <IonAlert
                    isOpen={confirmModal}
                    onDidDismiss={() => setConfirmModal(false)}
                    header={'Confirmar compra'}
                    subHeader={'¿Deseas confirmar la compra?'}
                    message={`El costo total de tu pedido es de ${totalAmount}. Un operador de la organización se contactará con usted para coordinar la entrega una vez que su comprobante de pago haya sido aprobado`}
                    buttons={[
                        {
                            text: 'Cancelar',
                            role: 'cancel',
                            cssClass: 'secondary',
                            handler: () => setConfirmModal(false)
                        },
                        {
                            text: 'Aceptar',
                            handler: () => {
                                submitProducts()
                            }
                        }
                    ]}
                />
            </IonContent>
            <ToastContainer/>
        </Layout>
    );
};

export default Cart;
