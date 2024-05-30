import React from "react";
import styled from "styled-components";
import { ColorKey } from "../../style/theme";

interface Props {
  children: React.ReactNode;
  size: "large" | "medium" | "small";
  color?: ColorKey;
}

const Title = ({ children, size, color }: Props) => {
  return (
    <TitleStyle size={size} color={color}>
      {children}
    </TitleStyle>
  );
};
// Omit을 사용하여 Props에서 children을 제외한 나머지를 받아옵니다.
// 대박 처음 써봄
const TitleStyle = styled.h1<Omit<Props, "children">>`
  font-size: ${({ theme, size }) => theme.heading[size].fontSize};
  color: ${({ theme, color }) => (color ? theme.color[color] : theme.color.primary)};
`;

export default Title;
