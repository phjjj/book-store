import { Book, BookDetail } from "../models/book.model";
import { Pagination } from "../models/pagenation.model";
import { httpclient } from "./http";

interface FetchBooksParams {
  category_id?: number;
  news?: boolean;
  currentPage?: number;
  limit: number;
}

interface FetchBooksResponse {
  books: Book[];
  pagination: Pagination;
}

export const fetchBooks = async (params: FetchBooksParams) => {
  try {
    const response = await httpclient.get<FetchBooksResponse>("/books", {
      params,
    });
    return response.data;
  } catch (error) {
    return {
      books: [],
      pagination: {
        totalCount: 0,
        currentPage: 1,
      },
    };
  }
};

export const fetchBook = async (bookId: string) => {
  try {
    const response = await httpclient.get<BookDetail>(`/books/${bookId}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const likeBook = async (bookId: number) => {
  try {
    const response = await httpclient.post<BookDetail>(`/likes/${bookId}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const unlikeBook = async (bookId: number) => {
  try {
    const response = await httpclient.delete<BookDetail>(`/likes/${bookId}`);
    return response.data;
  } catch (error) {
    return null;
  }
};

export const fetchBestBooks = async () => {
  const response = await httpclient.get<Book[]>("/books/best");

  return response.data;
};
