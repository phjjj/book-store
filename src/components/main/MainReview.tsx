import { BookReviewItem as IBookReviewItem } from "@/models/book.model";
import styled from "styled-components";
import BookReview from "../book/BookReview";
import BookReviewItem from "../book/BookReviewItem";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Pages {
  reviews: IBookReviewItem[];
}

function MainReview({ reviews }: Pages) {
  const sliderSettings = {
    dots: true, // 점으로 페이지네이션 여부
    infinite: true, // 무한 반복
    speed: 500,
    slidesToShow: 3, // 한 번에 보여줄 아이템 개수
    slidesToScroll: 3, // 한 번에 스크롤할 아이템 개수
    gap: 16,
  };

  return (
    <MainReviewStyle>
      <Slider {...sliderSettings}>
        {reviews.map((review) => (
          <BookReviewItem key={review.id} review={review} />
        ))}
      </Slider>
    </MainReviewStyle>
  );
}
const MainReviewStyle = styled.div`
  padding: 0 0 24px 0;

  .slick-track {
    padding: 12px 0;
  }

  .slick-slide > div {
    margin: 0 12px;
  }

  .slick-prev:before,
  .slick-next:before {
    color: #000;
  }
`;

export default MainReview;
