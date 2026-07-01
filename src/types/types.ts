export type MenuType={
    id:string;
    title:string;
    desc?:string;
    img?:string;
    color:string;
    slug:string;

}[];
export type ProductType={
    id:string;
    title:string;
    desc?:string;
    img?:string;
    price:number;
    options?:{title:string;additionalPrice:number}[];

};


export type OrderType = {
  id: string;
  userEmail: string;
  price: number;
  products: CartItemType[];
  status: string;
  createdAt: string;
  intent_id: string;
};
export type CartItemType = {
    cartId: string;

  id: string;
  title: string;
  img?: string;
  price: number;
  quantity: number;
  optionTitle?: { title: string; additionalPrice: number }[];
}
export type CartType = {
  products: CartItemType[];
  totalItems: number;
  totalPrice: number;
};
export type ActionType = {
 addTocart:(item: CartItemType)=>void;
 removeFromCart:(id:string)=>void;
 clearCart:()=>void;
 increaseQuantity:(id:string)=>void;
 decreaseQuantity:(id:string)=>void;
};
