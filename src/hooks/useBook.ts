import { useEffect, useState } from "react";
import { BookDetail } from "../models/book.model";
import { fetchBook, likeBook, unlikeBook } from "../api/books.api";
import { useAuthStore } from "../store/authStore";
import { useAlert } from "./useAlert";
import { addCart } from "../api/carts.api";

export const useBook = (bookId: string | undefined) => {
  const [book, setBook] = useState<BookDetail | null>(null);
  const [cartAdded, setCartAdded] = useState(false);
  const { isLoogedIn } = useAuthStore();
  const { showAlert } = useAlert();

  const likeToggle = () => {
    if (!isLoogedIn) {
      showAlert("로그인이 필요합니다.");
      return;
    }
    if (!book) return;

    if (book.liked) {
      // 라이크 취소
      unlikeBook(book.id).then(() => {
        // 낙관적 업데이트
        // fetch보다 빠르게 UI를 업데이트합니다.
        setBook({
          ...book,
          liked: false,
          likes: book.likes - 1,
        });
      });
    } else {
      // 라이크 등록
      likeBook(book.id).then(() => {
        // 낙관적 업데이트
        // fetch보다 빠르게 UI를 업데이트합니다.
        setBook({
          ...book,
          liked: true,
          likes: book.likes + 1,
        });
      });
    }
  };

  const addToCart = (quantity: number) => {
    if (!book) return;

    addCart({
      book_id: book.id,
      quantity,
    }).then(() => {
      setCartAdded(true);
      setTimeout(() => {
        setCartAdded(false);
      }, 3000);
    });
  };

  useEffect(() => {
    if (!bookId) return;

    fetchBook(bookId).then((data) => {
      setBook(data);
    });
  }, [bookId]);

  return { book, likeToggle, addToCart, cartAdded };
};
