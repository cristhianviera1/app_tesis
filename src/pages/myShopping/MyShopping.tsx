import React, {FunctionComponent, useEffect, useState} from "react";
import Layout from "../../components/layout/Layout";
import {IonContent, IonHeader, IonTitle, IonToolbar} from "@ionic/react";
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
                            quantity: product.quantity
                        })),
                        voucher: cart.voucher
                    })));
                    /*setMyShopping(data.map((cart:any)=>({

                    })))                    */
                })
                .catch(() => {

                })
                .finally(() => setLoading(false))
        }
    }

    useEffect(() => {
        getMyShopping();
    }, [])


    return (
        <Layout>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Mis compras</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {
                    myShopping?.map((cart, index) => (
                        <MyShoppingCard
                            key={index}
                            position={index + 1}
                            id={cart.id}
                            createdAt={cart.createdAt}
                            products={cart.products}
                            voucher={cart.voucher}
                            total={cart.total}
                        />
                    ))
                }
            </IonContent>
        </Layout>
    );
}
export default MyShopping;
