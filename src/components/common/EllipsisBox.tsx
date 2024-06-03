import { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { FaAngleDown } from "react-icons/fa";

interface Props {
  children: React.ReactNode;
  linelimit: number;
}

function EllipsisBox({ children, linelimit }: Props) {
  const [expended, setExpended] = useState(false);
  // styled-components로 만든 컴포넌트에 props를 넘겨줄 때는
  // attr에 string만 가능해서 앞에 달러를 붙여줘야함

  return (
    <EllipsisBoxStyle linelimit={linelimit} $expended={expended}>
      <p>{children}</p>
      <div className="toggle">
        <Button size="small" schema="normal" onClick={() => setExpended(!expended)}>
          {expended ? "접기" : "더보기"} <FaAngleDown />
        </Button>
      </div>
    </EllipsisBoxStyle>
  );
}

// 스타일 따로 만드셨지만 omit or pick으로 가능하지만
// 역할을 분리해서 사용하는듯
interface EllipsisBoxStyleProps {
  linelimit: number;
  $expended: boolean;
}

const EllipsisBoxStyle = styled.div<EllipsisBoxStyleProps>`
  p {
    overflow: hidden;
    text-overflow: ellipsis; // 텍스트가 너무 길면 ...으로 처리
    display: -webkit-box; // 브라우저 엔진
    -webkit-line-clamp: ${({ linelimit, $expended }) => ($expended ? "none" : linelimit)};
    -webkit-box-orient: vertical; // 세로로 쌓임
    padding: 20px 0 0 0;
    margin: 0;
  }
  .toggle {
    display: flex;
    justify-content: end;
  }
  svg {
    transform: ${({ $expended }) => ($expended ? "rotate(180deg)" : "rotate(0deg)")};
  }
`;

export default EllipsisBox;
