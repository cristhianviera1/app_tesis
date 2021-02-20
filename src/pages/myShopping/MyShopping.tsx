import React, {FunctionComponent, useEffect, useState} from "react";
import Layout from "../../components/layout/Layout";
import {IonBackButton, IonButtons, IonContent, IonHeader, IonSpinner, IonToolbar} from "@ionic/react";
import {axiosConfig} from "../../components/helpers/axiosConfig";
import {ProductsCardInfo} from "../../components/cards/products/Products-card";
import MyShoppingCard from "../../components/cards/myShopping/MyShopping-card";

export type StatusVoucherType =
    | 'pendiente comprobante'
    | 'pendiente aprobación'
    | 'aprobado'
    | 'denegado'

export interface VoucherStatus {
    status: StatusVoucherType,
    description?: string,
    created_at: number
}

export interface Voucher {
    image: string,
    statuses: VoucherStatus[]
}

export interface MyShoppingValue {
    position?: number,
    total?: number,
    id: string,
    createdAt: number,
    products: ProductsCardInfo[]
    voucher: Voucher
}

const MyShopping: FunctionComponent = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [myShopping, setMyShopping] = useState<MyShoppingValue[]>()

    const getMyShopping = () => {
        if (window !== undefined) {
            setLoading(true)
            axiosConfig().get('shopping-carts/me')
                .then(({data}) => {
                    setMyShopping(data.map((cart: any) => ({
                        id: cart._id,
                        total: cart.total,
                        createdAt: cart.created_at,
                        products: cart.products.map((product: any) => ({
                            ...product.product,
                            id: product.product._id,
                            _id: undefined,
                            quantity: product.quantity
                        })),
                        voucher: cart.voucher
                    })));
                })
                .catch(() => {

                })
                .finally(() => setLoading(false))
        }
    }

    useEffect(() => {
        if (!myShopping) {
            getMyShopping();
        }
    }, [myShopping])

    if (myShopping && myShopping?.length <= 0 && !loading) {
        return (
            <Layout>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton text={'Tus compras'} defaultHref="/profile"/>
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
                        <IonBackButton text={'Mis compras'} defaultHref="/profile"/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent style={{textAlign: 'center'}}>
                {loading &&
                    <IonSpinner name="lines" style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '50%'}}/>
                }
                {
                    !loading && myShopping?.map((cart, index) => (
                        <MyShoppingCard
                            key={index}
                            initialValues={{
                                ...cart,
                                position: index + 1
                            }}
                            onSend={() =>
                                getMyShopping()
                            }
                        />
                    ))
                }
            </IonContent>
        </Layout>
    );
}
export default MyShopping;
