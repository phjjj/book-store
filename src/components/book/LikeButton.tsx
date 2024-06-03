import styled from "styled-components";
import { BookDetail } from "../../models/book.model";
import Button from "../common/Button";
import { FaHeart } from "react-icons/fa";

interface Props {
  book: BookDetail;
  onclick: () => void;
}

function LikeButton({ book, onclick }: Props) {
  return (
    <LikeButtonStyle size="medium" schema={book.liked ? "like" : "normal"} onClick={onclick}>
      <FaHeart />
      {book.likes}
    </LikeButtonStyle>
  );
}
const LikeButtonStyle = styled(Button)`
  display: flex;
  gap: 6px;
  align-items: center;
  svg {
    color: inherit;
    // *는 모든 요소를 선택합니다.
    // inherit는 부모 요소의 속성을 상속받습니다.
    * {
      color: inherit;
    }
  }
`;

export default LikeButton;
