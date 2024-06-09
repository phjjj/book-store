import styled from "styled-components";
import { Pagination as IPagination } from "../../models/pagenation.model";
import { LIMIT } from "../constants/pagination";
import Button from "../common/Button";
import { useSearchParams } from "react-router-dom";
import { QUERYSTRING } from "../constants/querystring";
import React from "react";

interface Props {
  pagination: IPagination;
}

function Pagination({ pagination }: Props) {
  const { totalCount, currentPage } = pagination;
  const [searchParams, setSearchParams] = useSearchParams();

  const pages: number = Math.ceil(totalCount / LIMIT);

  const handelClickPage = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(QUERYSTRING.PAGE, page.toString());
    setSearchParams(newSearchParams);
  };

  return (
    <PaginationStyle>
      {pages > 0 && (
        <ol>
          {Array(pages)
            .fill(0)
            .map((_, index) => (
              <React.Fragment key={index}>
                <li>
                  <Button
                    size="small"
                    schema={index + 1 === currentPage ? "primary" : "normal"}
                    onClick={() => handelClickPage(index + 1)}>
                    {index + 1}
                  </Button>
                </li>
              </React.Fragment>
            ))}
        </ol>
      )}
    </PaginationStyle>
  );
}
const PaginationStyle = styled.div`
  display: flex;
  justify-content: start;
  aligh-items: center;
  padding: 24px 0;

  ol {
    display: flex;
    gap: 8px;
    list-style: none;
    padding: 0;
    margin: 0;
  }
`;

export default Pagination;
