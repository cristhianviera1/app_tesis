import React, {FunctionComponent, useEffect, useState} from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonSpinner,
    IonToolbar
} from '@ionic/react';
import './ProductView.css';
import Layout from "../../components/layout/Layout";
import {useHistory} from "react-router-dom";
import {axiosConfig} from "../../components/helpers/axiosConfig";
import {ProductCard} from "./Products";
import useGlobal from "../../hooks/globalShoppingCart";
import {ProductsCardInfo} from "../../components/cards/products/Products-card";

const ProductView: FunctionComponent = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [product, setProduct] = useState<ProductCard>();
    const [productAlreadyInCart, setAlreadyInCart] = useState<boolean>(false)
    const [globalState, globalActions] = useGlobal();
    const history = useHistory();

    const getProductDetail = (id: string) => {
        setLoading(true)
        axiosConfig().get(`products/${id}`)
            .then(({data}) => {
                setProduct({
                    _id: data._id,
                    name: data.name,
                    image: data.image,
                    detail: data.detail,
                    price: data.price,
                })
            })
            .catch(() => {
            })
            .finally(() => setLoading(false))
    }
    useEffect(() => {
        const id: any = history.location.state;
        console.log(id);
        !product && getProductDetail(id)
        setAlreadyInCart(globalState.shoppingCart.findIndex((product: ProductsCardInfo) => product.id == id) !== -1)
    }, [history, globalState])

    if (!product || loading) {
        return (
            <Layout>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/products"/>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent style={{textAlign: 'center'}}>
                    <IonSpinner name="lines" style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '50%'}}/>
                </IonContent>
            </Layout>
        );
    }

    return (
        <Layout>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton text={product?.name} defaultHref="/products"/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonCard className={"product-card"} style={{marginBottom:'20%'}}>
                    <IonCardHeader>
                        <img width="100%" height="100%"
                             src={product?.image}/>
                        <IonCardSubtitle>{product?.price}</IonCardSubtitle>
                        <IonCardTitle>{product?.name}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        {product?.detail}
                    </IonCardContent>
                    {
                        !productAlreadyInCart &&
                        <IonButton className={"btn"} expand={"block"} onClick={() => {
                            globalActions.addProduct({
                                ...product,
                                id: product?._id,
                                quantity: 1
                            })
                        }}>Agregar al carrito
                        </IonButton>
                    }
                    {
                        productAlreadyInCart &&
                        <IonButton className={"btn"} expand={"block"} fill={'outline'} onClick={() => {
                            globalActions.changeQuantity(product?._id, true)
                        }}>
                            Añadir más
                        </IonButton>
                    }
                </IonCard>
            </IonContent>
        </Layout>
    );
};
export default ProductView;
