import { Book } from "@/models/book.model";
import styled from "styled-components";
import BooksItem from "../books/BookItem";

interface Props {
  books: Book[];
}

function MainNewBooks({ books }: Props) {
  return (
    <MainNewBooksStyle>
      {books.map((book) => (
        <BooksItem key={book.id} book={book} view="grid" />
      ))}
    </MainNewBooksStyle>
  );
}
const MainNewBooksStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
`;

export default MainNewBooks;
