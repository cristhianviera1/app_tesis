import React, {FunctionComponent, useEffect, useState} from 'react';
import {
    IonBadge,
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonRefresher,
    IonRefresherContent,
    IonSearchbar,
    IonSpinner,
    IonToolbar
} from '@ionic/react';
import './Products.css';
import Layout from "../../components/layout/Layout";
import ProductsCard from "../../components/cards/products/Products-card";
import {cartOutline} from 'ionicons/icons';
import {axiosConfig} from "../../components/helpers/axiosConfig";
import useGlobal from "../../hooks/globalShoppingCart";
import {useHistory} from "react-router-dom";

export interface ProductCard {
    _id: string;
    name: string;
    image: string;
    detail: string;
    price: number;
}

const Products: FunctionComponent = () => {
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState<boolean>(false)
    const [products, setProducts] = useState<ProductCard[]>([]);
    const [globalState] = useGlobal();
    const [totalProducts, setTotalProducts] = useState<number>(0)
    const history = useHistory();

    const getProducts = (event?: CustomEvent) => {
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
            .finally(() => {
                setLoading(false);
                event?.detail?.complete();
            })
    }

    useEffect(() => {
        let total = 0;
        globalState.shoppingCart.map((product) => total += product.quantity);
        setTotalProducts(total)
        getProducts();
    }, [globalState])
    return (
        <Layout>
            <IonHeader>
                <IonToolbar>
                    <IonSearchbar placeholder='Buscar productos' value={searchText}
                                  onIonChange={e => setSearchText(e.detail.value!)} showCancelButton="focus"
                                  cancelButtonText="Cancelar"/>
                    <IonButton onClick={() => history.push('/cart')} slot="end" fill="clear">
                        <IonIcon slot="icon-only" icon={cartOutline}/>
                        {
                            totalProducts > 0 &&
                            <IonBadge color="primary" style={{
                                position: 'absolute',
                                bottom: 0,
                                right: '-50%',
                            }}>
                                {totalProducts}
                            </IonBadge>
                        }
                    </IonButton>
                </IonToolbar>

            </IonHeader>
            <IonContent fullscreen>
                {loading &&
                <div style={{textAlign: 'center'}}>
                    <IonSpinner name="lines" style={{marginLeft: 'auto', marginRight: 'auto', marginTop: '50%'}}/>
                </div>
                }
                <IonRefresher slot="fixed" onIonRefresh={getProducts}>
                    <IonRefresherContent>
                    </IonRefresherContent>
                </IonRefresher>
                <div style={{marginBottom: '20%'}}>
                    {
                        products?.filter(product => {
                            if (searchText !== '') {
                                return product.name.toLowerCase().includes(searchText.toLocaleLowerCase());
                            }
                            return true;
                        })?.map((product) =>
                            <ProductsCard
                                key={product._id}
                                id={product._id}
                                name={product.name}
                                image={product.image}
                                detail={product.detail.slice(0, 20)}
                                price={product.price}
                                quantity={0}
                            />
                        )
                    }
                </div>
            </IonContent>
        </Layout>
    );
};

export default Products;
