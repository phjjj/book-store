import styled from "styled-components";
import Title from "../components/common/Title";
import BooksFilter from "../components/books/BooksFilter";
import BooksList from "../components/books/BooksList";
import BooksEmpty from "../components/books/BooksEmpty";
import Pagination from "../components/books/Pagination";
import BooksViewSwitcher from "../components/books/BooksViewSwitcher";
import { useBooks } from "../hooks/useBooks";
import Loading from "@/components/common/Loading";
import { useBooksInfinite } from "@/hooks/useBooksInfinite";
import Button from "@/components/common/Button";
import { useEffect, useRef, useState } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

function Books() {
  const {
    books,
    pagination,
    isEmpty,
    isBooksLoading,
    fetchNextPage,
    hasNextPage,
  } = useBooksInfinite();

  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const moreRef = useIntersectionObserver(([entry]) => {
    if (entry.isIntersecting) {
      loadMore();
    }
  });

  const loadMore = () => {
    if (!hasNextPage) return;
    setScrollPosition(window.scrollY); // 스크롤 위치 저장
    fetchNextPage();
  };

  useEffect(() => {
    if (scrollPosition && !isBooksLoading) {
      window.scrollTo(0, scrollPosition); // 저장된 위치로 스크롤 이동
    }
  }, [scrollPosition, isBooksLoading]);

  if (isEmpty) {
    return <BooksEmpty />;
  }
  if (isBooksLoading) {
    return <Loading />;
  }

  if (!books || !pagination || isBooksLoading) {
    return <Loading />;
  }

  return (
    <>
      <Title size="large">도서 검색 결과</Title>
      <BooksStyle ref={containerRef}>
        <div className="filter">
          <BooksFilter />
          <BooksViewSwitcher />
        </div>
        <BooksList books={books} />
        {/* <Pagination pagination={pagination} /> */}
        <div className="more" ref={moreRef}>
          <Button
            size="medium"
            schema="normal"
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage}>
            {hasNextPage ? "더보기" : "마지막 페이지입니다"}
          </Button>
        </div>
      </BooksStyle>
    </>
  );
}

const BooksStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;

  .filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
  }
`;

export default Books;
