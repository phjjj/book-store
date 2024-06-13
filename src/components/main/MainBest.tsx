import { Book } from "@/models/book.model";
import styled from "styled-components";
import BookBestItem from "../books/BookBestItem";

interface Props {
  books: Book[];
}

function MainBest({ books }: Props) {
  return (
    <MainBestStyle>
      {books.map((book, index) => (
        <BookBestItem book={book} itemIndex={index} key={book.isbn} />
      ))}
    </MainBestStyle>
  );
}
const MainBestStyle = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  margin-top: 1rem;
`;

export default MainBest;
