import moment from 'moment';

class Order {
    id:any;
    items:any;
    totalAmount:any;
    date:any;
    constructor(id:any,items:any,totalAmount:any,date:any){
        this.id =id;
        this.items = items;
        this.totalAmount = totalAmount;
        this.date = date;
    }

    get renderTime() {
        return moment(this.date).format('MMMM Do YYYY, hh:mm');
    }
}

export default Order;