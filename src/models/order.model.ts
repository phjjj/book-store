export interface Order {
  id: number;
  createdAt: string;
  address: string;
  recevier: string;
  contact: string;
  booktitle: string;
  totalQuantity: number;
  totalPrice: number;
}

export interface OrderSheet {
  items: number[];
  totalQuantity: number;
  totalPrice: number;
  firstBookTitle: string;
  delivery: {
    address: string;
    recevier: string;
    contact: string;
  };
}
