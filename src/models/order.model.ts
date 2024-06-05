export interface Order {
  id: number;
  createdAt: string;
  address: string;
  recevier: string;
  contact: string;
  book_title: string;
  total_quantity: number;
  total_price: number;
}

export interface OrderDetailItem {
  author: string;
  book_id: number;
  price: number;
  quantity: number;
  title: string;
}

export interface OrderListItem extends Order {
  detail?: OrderDetailItem[];
}

export interface OrderSheet {
  items: number[];
  totalQuantity: number;
  totalPrice: number;
  firstBookTitle: string;
  delivery: Delivery;
}

export interface Delivery {
  address: string;
  receiver: string;
  contact: string;
}
