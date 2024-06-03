import { getByAltText, render } from "@testing-library/react";
import { BookStoreThemeContextProvider } from "../../context/themeContext";
import BooksItem from "./BooksItem";
import { Book } from "../../models/book.model";

const dummyBook: Book = {
  id: 7,
  title: "해님달님",
  img: 15,
  category_id: 2,
  form: "ebook",
  isbn: "6",
  summary: "동앗줄..",
  detail: "황금 동앗줄..!",
  author: "김해님",
  pages: 100,
  contents: "목차입니다.",
  price: 20000,
  likes: 1,
  pub_date: "2024-04-08",
};

describe("BooksItem", () => {
  it("렌더 여부", () => {
    const { getByText } = render(
      <BookStoreThemeContextProvider>
        <BooksItem book={dummyBook} />
      </BookStoreThemeContextProvider>
    );
    expect(getByText(dummyBook.title)).toBeInTheDocument();
    expect(getByText(dummyBook.summary)).toBeInTheDocument();
    expect(getByText(dummyBook.author)).toBeInTheDocument();
    expect(getByText("10,000원")).toBeInTheDocument();
    expect(getByText(dummyBook.likes)).toBeInTheDocument();
    // expect(getByAltText(dummyBook.img)).toHaveAttribute("src", `https://picsum.phots/id/${dummyBook.img}/600/600`);
  });
});
