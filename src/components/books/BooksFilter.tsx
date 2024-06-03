import styled from "styled-components";
import { useCategory } from "../../hooks/useCategory";
import Button from "../common/Button";
import { useSearchParams } from "react-router-dom";
import { QUERYSTRING } from "../constants/querystring";

function BooksFilter() {
  const { category } = useCategory();
  // useSearchParams() 훅을 사용하여 URLSearchParams 객체를 생성하고, URLSearchParams 객체를 사용하여 URL 쿼리 문자열을 조작합니다.
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCategory = (id: number | null) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (id === null) {
      // 설명: category_id가 없으면 삭제
      // URLSearchParams.delete() 메서드는 키가 존재하면 제거하고 true를 반환하며, 그렇지 않으면 false를 반환합니다.
      newSearchParams.delete(QUERYSTRING.CATEGORY_ID);
    } else {
      newSearchParams.set(QUERYSTRING.CATEGORY_ID, id.toString());
    }
    setSearchParams(newSearchParams);
  };

  const handleNews = () => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (newSearchParams.get(QUERYSTRING.NEWS)) {
      newSearchParams.delete(QUERYSTRING.NEWS);
    } else {
      newSearchParams.set(QUERYSTRING.NEWS, "true");
    }
    setSearchParams(newSearchParams);
  };
  return (
    <BooksFilterStyle>
      <div className="category">
        {category.map((item) => (
          <Button
            size="medium"
            schema={item.isActive ? "primary" : "normal"}
            key={item.id}
            onClick={() => handleCategory(item.id)}>
            {item.name}
          </Button>
        ))}
      </div>
      <div className="new">
        <Button
          onClick={() => handleNews()}
          size="medium"
          schema={searchParams.get(QUERYSTRING.NEWS) ? "primary" : "normal"}>
          신간
        </Button>
      </div>
    </BooksFilterStyle>
  );
}
const BooksFilterStyle = styled.div`
  display: flex;
  gap: 24px;
  .category {
    display: flex;
    gap: 8px;
  }
`;

export default BooksFilter;
