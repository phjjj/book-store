import React from "react";
import styled from "styled-components";
const Header = () => {
  return (
    <HeaderStyled>
      <h1>Book Store</h1>
    </HeaderStyled>
  );
};

const HeaderStyled = styled.header`
  background-color: ${(props) => props.theme.color.background};
  h1 {
    color: ${(props) => props.theme.color.primary};
  }
`;

export default Header;
