import { autoSubscribe, AutoSubscribeStore, StoreBase } from 'resub';
import CartItem from '../models/Cart-Item';

@AutoSubscribeStore
class CartResub extends StoreBase {
    private items: any[] =[];
    private totalAmount: number = 0;

    @autoSubscribe
    getItems() {
        return this.items;
    }

    @autoSubscribe
    getTotalAmount() {
        return this.totalAmount;
    }
    
    setDefault(){
        this.items=[];
        this.totalAmount=0;
        this.trigger();
    }

    addToCart(product: any) {
        const addProd = product;
        const price = addProd.price;
        const title = addProd.title;

        let updataCartItem;
        if (this.items[addProd.id]) {
            updataCartItem = new CartItem(
                this.items[addProd.id].quantity + 1,
                price,
                title,
                this.items[addProd.id].sum + price
            );

        }
        else {
            updataCartItem = new CartItem(1, price, title, price);
        }

        this.items = { ...this.items, [addProd.id]: updataCartItem };
        this.totalAmount = this.totalAmount + price;

        this.trigger();
    }

    removeFromCart(productId: any) {

        const product = this.items[productId];
        const quantity = this.items[productId].quantity;
        let updateCartItems;
        if (quantity > 1) {
            console.log('check quantiti  ', product.quantity);
            const updateCartItem = new CartItem(
                product.quantity - 1,
                product.productPrice,
                product.ProductTitle,
                product.sum - product.productPrice
            );
            updateCartItems = { ...this.items, [productId]: updateCartItem };
        }
        else {
            updateCartItems = { ...this.items };
            delete updateCartItems[productId];
        }

        this.items = updateCartItems;
        this.totalAmount = this.totalAmount - product.productPrice;

        this.trigger();
    };
    // case ADD_ORDER:
        //     return initialCart;

        // case DELETE_PRODUCT:
        //     const updateItem = { ...state.items };
        //     if(!updateItem[action.pid]){
        //         return state;
        //     }
        //     const itemtotal = state.items[action.pid].sum;
        //     delete updateItem[action.pid];
        //     return {
        //         ...state,
        //         items: updateItem,
        //         totalAmount : state.totalAmount - itemtotal
        //     }
        // default:
        //     return state;
}

export default CartResub;