import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ThemeSwitcher from "../header/ThemeSwitcher";
import { FaSignInAlt, FaRegUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Category } from "../../models/category.model";
import { fetchCategory } from "../../api/category.api";
import { useCategory } from "../../hooks/useCategory";
import { useAuthStore } from "../../store/authStore";

const Header = () => {
  const { category } = useCategory();

  const { isLoogedIn, storeLogin, storeLogout } = useAuthStore();

  return (
    <HeaderStyled>
      <h1 className="logo">
        <Link to="/">
          <img src="" alt="book store" />
        </Link>
      </h1>

      <nav className="category">
        <ul>
          {category.map((category) => (
            <li key={category.id}>
              {/* 전체 카티고리는 null이니, books */}
              <Link to={category.id === null ? `/books` : `/books?category=${category}`}>{category.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav className="auth">
        {isLoogedIn ? (
          <ul>
            <li>
              <Link to={"/cart"}>장바구니</Link>
            </li>
            <li>
              <Link to={"/orderList"}>주문 내역</Link>
            </li>
            <li>
              <button onClick={storeLogout}>로그아웃</button>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to="/login">
                <FaSignInAlt />
                로그인
              </Link>
            </li>
            <li>
              <Link to="/signup">
                <FaRegUser />
                회원가입
              </Link>
            </li>
          </ul>
        )}
      </nav>
    </HeaderStyled>
  );
};

const HeaderStyled = styled.header`
  width: 100%; // 반응형을 위해 100%로 지정합니다.
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large}; //
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.border};

  .logo {
    img {
      width: 200px;
    }
  }

  .category {
    ul {
      display: flex;
      gap: 32px;
      li {
        a {
          font-size: 1.5rem;
          font-weight: 600;
          text-decoration: none;
          color: ${({ theme }) => theme.color.text};

          &:hover {
            color: ${({ theme }) => theme.color.primary};
          }
        }
      }
    }
  }

  .auth {
    ul {
      display: flex;
      gap: 16px;
      li {
        a,
        button {
          border: 0;
          background: none;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          display: flex;
          align-items: center;
          line-height: 1;
          svg {
            margin-right: 6px;
          }
        }
      }
    }
  }
`;

export default Header;
