import MainReview from "@/components/main/MainReview";
import Title from "@/components/common/Title";
import { useMain } from "@/hooks/useMain";
import styled from "styled-components";
import MainNewBooks from "@/components/main/MainNewBooks";
import MainBest from "@/components/main/MainBest";
import Banner from "@/components/common/banner/Banner";

function Home() {
  const { review, newBooks, bestBooks, banners } = useMain();

  return (
    <HomeStyle>
      <section className="section">
        <Banner banners={banners} />
      </section>

      <section className="section">
        <Title size="large">베스트셀러</Title>
        <MainBest books={bestBooks} />
      </section>

      <section className="section">
        <Title size="large">신간 안내</Title>
        <MainNewBooks books={newBooks} />
      </section>

      <section className="section">
        <Title size="large">리뷰</Title>
        <MainReview reviews={review} />
      </section>
    </HomeStyle>
  );
}
const HomeStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export default Home;
