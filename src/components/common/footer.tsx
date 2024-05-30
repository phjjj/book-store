import React from "react";
import styled from "styled-components";

const footer = () => {
  return (
    <FooterStyled>
      <h1 className="logo">
        <img src="" alt="book store" />
      </h1>
      <hr />
      <div className="copyright">
        <p>copyright(c), 2024, book store</p>
      </div>
    </FooterStyled>
  );
};

const FooterStyled = styled.footer`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};
  border-top: 1px solid ${({ theme }) => theme.color.border};
  padding: 20px 0;
  justify-content: space-between;
  .logo {
    img {
      width: 140px;
    }
  }
  .copyright {
    p {
      font-size: 0.75rem;
      color: ${({ theme }) => theme.color.text};
    }
  }
`;

export default footer;
