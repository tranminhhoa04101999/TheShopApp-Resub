class Product {
    id:any;
    ownerId:any;
    title:any;
    imageUrl:any;
    description:any;
    price:any;
    constructor(id:any,ownerId:any,title:any,imageUrl:any,description:any,price:any){
        this.id =id;
        this.ownerId = ownerId;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }
}

export default Product;
