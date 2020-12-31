import React, {FunctionComponent, useEffect, useState} from 'react';
import {IonButton, IonContent, IonHeader, IonIcon, IonSearchbar, IonToolbar} from '@ionic/react';
import './Products.css';
import Layout from "../../components/layout/Layout";
import ProductsCard from "../../components/cards/products/Products-card";
import {cartOutline} from 'ionicons/icons';
import {axiosConfig} from "../../components/helpers/axiosConfig";

export interface ProductCard {
    _id: string;
    name: string;
    image: string;
    detail: string;
    price: string;
}

const Products: FunctionComponent = () => {
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState<boolean>(false)
    const [products, setProducts] = useState<ProductCard[]>([]);


    const getProducts = () => {
        setLoading(true)
        axiosConfig().get('products')
            .then(({data}) => {
                setProducts(data.map((product: ProductCard) => ({
                    _id: product._id,
                    name: product.name,
                    image: product.image,
                    detail: product.detail,
                    price: product.price,
                })))
            })
            .catch(() => {
            })
            .finally(() => setLoading(false))
    }

    useEffect(() => {
        getProducts();
    }, [])
    return (
        <Layout>
            <IonHeader>
                <IonToolbar>
                    <IonSearchbar placeholder='Buscar productos' value={searchText} onIonChange={e => {
                        products?.filter((product) => {
                            product.name.includes(e.detail.value!)
                        })
                    }} showCancelButton="focus" cancelButtonText="Cancelar"/>
                    <IonButton href="/cart" slot="end" fill="clear">
                        <IonIcon slot="icon-only" icon={cartOutline}/>
                    </IonButton>
                </IonToolbar>

            </IonHeader>
            <IonContent fullscreen>
                {
                    searchText ?
                        products.map((product) => {
                            if (product.name.includes(searchText)) {
                                return <ProductsCard
                                    key={product._id}
                                    id={product._id}
                                    name={product.name}
                                    image={product.image}
                                    detail={product.detail.slice(0, 20)}
                                    price={`$${product.price}`}
                                />
                            }
                        })
                        :
                        products?.map((product) =>
                            <ProductsCard
                                key={product._id}
                                id={product._id}
                                name={product.name}
                                image={product.image}
                                detail={product.detail.slice(0, 20)}
                                price={`$${product.price}`}
                            />
                        )
                }
            </IonContent>
        </Layout>
    );
};

export default Products;
