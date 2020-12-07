import React, {FunctionComponent, useEffect, useState} from 'react';
import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle, IonContent,
    IonHeader,
    IonLabel,
    IonToolbar
} from '@ionic/react';
import './ProductView.css';
import Layout from "../../components/layout/Layout";
import {useHistory, useLocation} from "react-router-dom";
import {axiosConfig} from "../../components/helpers/axiosConfig";
import {ProductsCardInfo} from "../../components/cards/products/Products-card";
import {ProductCard} from "./Products";
import {image} from "ionicons/icons";

const ProductView: FunctionComponent = () => {
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState<boolean>(false);
    const [productId, setProductId] = useState();
    const [product, setProduct] = useState<ProductCard>();
    const history = useHistory();

    const getProductDetail = (id:string) => {
        setLoading(true)
        axiosConfig().get(`products/${id}`)
            .then(({data})=>{
                setProduct({
                    _id: data._id,
                    name: data.name,
                    image: data.image,
                    detail: data.detail,
                    price: data.price,
                })
                setLoading(true);
            })
            .catch(()=>{
                setLoading(true)
            })
    }
    useEffect(() => {
        const id: any = history.location.state;
        setProductId(id);
        !product && getProductDetail(id)
    }, [history])
    return (
        <Layout>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/products"/>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonCard className={"product-card"}>
                    <IonCardHeader>
                        <img width="100%" height="100%"
                             src={product?.image}/>
                        <IonCardSubtitle>{product?.price}</IonCardSubtitle>
                        <IonCardTitle>{product?.name}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        {product?.detail}
                    </IonCardContent>
                    <IonButton className={"btn"} expand={"block"} color="success" href="/login">Agregar al
                        carrito</IonButton>
                </IonCard>
            </IonContent>
        </Layout>
    );
};
export default ProductView;
