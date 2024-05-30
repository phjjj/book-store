export interface Cart {
  id: number;
  bookId: number;
  title: string;
  summary: string;
  quantity: number;
  price: number; // 책의 가격을 가끔 string으로 넣는 경우가 있는데 안된다
}
