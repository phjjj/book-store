import { Book } from "@/models/book.model";
import styled from "styled-components";
import BookItem, { BookItemStyle } from "./BookItem";
interface Props {
  book: Book;
  itemIndex: number;
}
function BookBestItem({ book, itemIndex }: Props) {
  return (
    <BookBestItemStyle>
      <BookItem book={book} view="grid" />
      <div className="rank">
        <span>{itemIndex + 1}</span>
      </div>
    </BookBestItemStyle>
  );
}
const BookBestItemStyle = styled.div`
  ${BookItemStyle} {
    .summary,
    .price,
    .likes {
      display: none;
    }
  }
  h2 {
    display: -webkit-box;
    -webkit-line-clamp: 2; // 두 줄까지만 보여줌
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  position: relative;

  .rank {
    position: absolute;
    top: -10px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: ${({ theme }) => theme.color.primary};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.25rem;
    color: white;
    font-weight: bold;
    font-style: italic;
  }
`;

export default BookBestItem;
