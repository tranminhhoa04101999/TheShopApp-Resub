import { autoSubscribe, AutoSubscribeStore, StoreBase } from 'resub';
import AuthResub from './authResub';
import Order from '../models/Order';

@AutoSubscribeStore
class OrderResub extends StoreBase {
    private orders: Order[] = [];
    private AuthStore: AuthResub;

    constructor(_athSto: AuthResub) {
        super();
        this.AuthStore = _athSto;
    }


    @autoSubscribe
    getOrders() {
        return this.orders;
    }

    async addOrder(orderItems: any, totalAmount: any) {
        let userId = this.AuthStore.userId;
        console.log("addOrder ",userId);
        const token = this.AuthStore.token;
        const date = new Date();
        const response = await fetch(`https://theshopapp-rn-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${userId}.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                orderItems,
                totalAmount,
                date: date.toUTCString(),
            })
        });
        console.log("repo phan addorder ",response );
        

        const resData = await response.json();

        const newOrder = new Order(
            orderItems.id,
            orderItems.items,
            orderItems.amount,
            orderItems.date,
        );
        this.orders = this.orders.concat(newOrder);

        this.trigger();
    }

    async fetchOrders(){
        const userId = this.AuthStore.userId;
        try {
            const response = await fetch(`https://theshopapp-rn-default-rtdb.asia-southeast1.firebasedatabase.app/orders/${userId}.json`);

            if (!response.ok) {
                throw new Error('lấy dữ liệu thất bại !!');
            }

            const resData = await response.json();
            const data = [];
            for (const key in resData) {
                data.push(new Order(
                    key,
                    resData[key].orderItems,
                    resData[key].totalAmount,
                    new Date(resData[key].date)
                ));
            }
            this.orders = data;

        } catch (err) {
            throw err;
        };
        this.trigger();
    }

}

export default OrderResub;