class CartItem {
    quantity:any;
    productPrice;
    ProductTitle;
    sum;
    constructor(quantity:any,productPrice:any,ProductTitle:any,sum:any){
        this.quantity = quantity;
        this.productPrice = productPrice;
        this.ProductTitle = ProductTitle;
        this.sum = sum;
    }
}

export default CartItem;