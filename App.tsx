//#region import thu vien
import React from 'react';
import { } from 'react-native';

import ProductNavigator from './navigations/ProductNavigator';
//#endregion
import { createContext } from 'react';
import authResub from './Resub/authResub';
import productRsub from './Resub/ProductResub';
import cartResub from './Resub/cartResub';
import OrderResub from './Resub/OrderResub';


const authResubC = new authResub();
export const AuthStore = createContext(authResubC);

const productRe = new productRsub(authResubC);
export const ProductResub = createContext(productRe);

const cartRe = new cartResub();
export const CartStore = createContext(cartRe);

const OrderRe = new OrderResub(authResubC);
export const OrderStore = createContext(OrderRe);

export default function App() {
  return (
    <AuthStore.Provider value={authResubC}>
      <ProductResub.Provider value={productRe} >
        <CartStore.Provider value={cartRe}>
          <OrderStore.Provider value={OrderRe}>
              <ProductNavigator />
          </OrderStore.Provider>
        </CartStore.Provider>
      </ProductResub.Provider>
    </AuthStore.Provider>
  );
};
