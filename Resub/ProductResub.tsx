import { useContext } from 'react';
import { autoSubscribe, AutoSubscribeStore, StoreBase } from 'resub';
import Product from '../models/Product';
import { AuthStore } from '../App';
import authResub from './authResub';

// export function useStoreResub(){
//     const authSto = useContext(AuthStore)
//     ///let store = new StoreResub(authSto);
//     let store = new StoreResub(authSto)
//     return store;
// }

@AutoSubscribeStore
class StoreResub extends StoreBase {
    public availableProducts: Product[] = [];
    public userProducts: Product[] = [];
    private authSto: authResub;

    constructor(_authSto: authResub) {
        super();
        this.authSto = _authSto;
    };

    @autoSubscribe
    getAvailableProducts() {
        return this.availableProducts;
    }

    @autoSubscribe
    getUserProducts() {
        return this.userProducts;
    }

    async fetchProduct() {
        const userId = this.authSto.userId;
        try {
            const response = await fetch('https://theshopapp-rn-default-rtdb.asia-southeast1.firebasedatabase.app/products.json');


            if (!response.ok) {
                throw new Error('có lỗi ở link api');
            };
            const resData = await response.json();
            console.log("fetch product ",resData);
            
            const loadData = [];

            for (const key in resData) {
                loadData.push(new Product(
                    key,
                    resData[key].ownerId,
                    resData[key].title,
                    resData[key].imageUrl,
                    resData[key].description,
                    resData[key].price
                ));
            }
            this.availableProducts = loadData;
            console.log("loaddata ne ",loadData);
            console.log("userId ne ",userId);
            
            
            this.userProducts = loadData.filter(data => data.ownerId === userId);
        }
        catch (err) {
            throw err;
        }
        this.trigger();
    }

    async deleteProduct(productId: any) {
        const token = this.authSto.token;
        const response = await fetch(`https://theshopapp-rn-default-rtdb.asia-southeast1.firebasedatabase.app/products/${productId}.json?auth=${token}`, {
            method: 'DELETE'
        });
        this.userProducts = this.userProducts.filter(prop => prop.id !== productId);
        this.availableProducts = this.availableProducts.filter(prop => prop.id !== productId);
        this.trigger();
    }

    async createProduct(title: string, description: string, imageUrl: string, price: any) {
        const userId = this.authSto.userId;
        const token = this.authSto.token;
        const response = await fetch(`https://theshopapp-rn-default-rtdb.asia-southeast1.firebasedatabase.app/products.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                price,
                ownerId: userId
            })
        });
        console.log("addproduct ",response);
        

        const resData = await response.json();

        const newPro = new Product(resData.name, userId, title, imageUrl, description, price);
        this.availableProducts = this.availableProducts.concat(newPro);
        this.userProducts = this.userProducts.concat(newPro);
        this.trigger();
    }

    async updateProduct(id: any, title: string, description: string, imageUrl: string) {
        const token = this.authSto.token;
        const response = await fetch(`https://theshopapp-rn-default-rtdb.asia-southeast1.firebasedatabase.app/products/${id}.json?auth=${token}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                description,
                imageUrl
            })
        });



        const productIndex = this.userProducts.findIndex(prod => prod.id === id);
        const updateProd = new Product(
            id,
            this.userProducts[productIndex].ownerId,
            title,
            imageUrl,
            description,
            this.userProducts[productIndex].price
        )
        const updateUserProduct = this.userProducts;
        updateUserProduct[productIndex] = updateProd;

        const availableProdindex = this.availableProducts.findIndex(prod => prod.id === id);
        const updateAvalableProd = this.availableProducts;
        updateAvalableProd[availableProdindex] = updateProd;

        this.availableProducts = updateAvalableProd;
        this.userProducts = updateUserProduct;

        this.trigger();
    }

}

export default StoreResub;