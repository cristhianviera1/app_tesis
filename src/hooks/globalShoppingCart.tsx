import globalHook, {Store} from 'use-global-hook';
import {ProductsCardInfo} from "../components/cards/products/Products-card";
import React from "react";

type InitialCartType = {
    shoppingCart: ProductsCardInfo[]
}
const initialCartValue: InitialCartType = {
    shoppingCart: []
};
type MyAssociatedActions = {
    addProduct: (product: ProductsCardInfo) => void;
    changeQuantity: (productID: string, isAdd: boolean) => void;
    removeProduct: (productID: string) => void;
    cleanCart: () => void;
};
const addProduct = (
    store: Store<InitialCartType, MyAssociatedActions>,
    product: ProductsCardInfo
) => {
    store.setState({shoppingCart: [...store.state.shoppingCart, product]});
};
const cleanCart = (
    store: Store<InitialCartType, MyAssociatedActions>,
) => {
    store.setState({shoppingCart: []});
};
const changeQuantity = (
    store: Store<InitialCartType, MyAssociatedActions>,
    productID: string,
    isAdd: boolean,
) => {
    const tempProducts = store.state.shoppingCart;
    const productIndex = tempProducts.findIndex((product) => product.id == productID);
    if (isAdd) {
        tempProducts[productIndex].quantity += 1;
    } else {
        tempProducts[productIndex].quantity -= 1;
        tempProducts[productIndex].quantity <= 0 && tempProducts.splice(productIndex, 1);
    }
    store.setState({shoppingCart: tempProducts});
};

const removeProduct = (
    store: Store<InitialCartType, MyAssociatedActions>,
    productID: string,
) => {
    const tempProducts = store.state.shoppingCart;
    const productIndex = tempProducts.findIndex((product) => product.id == productID);
    tempProducts.splice(productIndex, 1);
    store.setState({shoppingCart: tempProducts});
}

const actions = {
    addProduct,
    changeQuantity,
    removeProduct,
    cleanCart
}
const useGlobal = globalHook<InitialCartType, MyAssociatedActions>(React, initialCartValue, actions);

export default useGlobal;
