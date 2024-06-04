import styled from "styled-components";
import { FaRegCircle, FaRegCheckCircle } from "react-icons/fa";

interface Props {
  isChecked: boolean;
  onCheck: () => void;
}

function CheckIconButton({ isChecked, onCheck }: Props) {
  return (
    <CheckIconButtonStyle>
      {isChecked ? <FaRegCheckCircle onClick={onCheck} /> : <FaRegCircle onClick={onCheck} />}
    </CheckIconButtonStyle>
  );
}
const CheckIconButtonStyle = styled.button`
  background: none;
  border: none;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
  }
`;

export default CheckIconButton;
