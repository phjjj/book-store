import { Banner as IBanner } from "@/models/banner.model";
import styled from "styled-components";
import BannerItem from "./BannerItem";
import { useMemo, useState } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";

interface Props {
  banners: IBanner[];
}

function Banner({ banners }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const transFormValue = useMemo(() => {
    return currentIndex * -100;
  }, [currentIndex]);

  const handlePrev = () => {
    if (currentIndex === 0) return;
    setCurrentIndex(currentIndex - 1);
  };
  const handleNext = () => {
    if (currentIndex === banners.length - 1) return;
    setCurrentIndex(currentIndex + 1);
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <Bannertyle>
      <BannerContainerStyle $transFormValue={transFormValue}>
        {banners.map((banner) => (
          <BannerItem key={banner.id} banner={banner} />
        ))}
      </BannerContainerStyle>

      <BannerButtonStyle>
        <button className="prev" onClick={handlePrev}>
          <FaAngleLeft />
        </button>

        <button className="next" onClick={handleNext}>
          <FaAngleRight />
        </button>
      </BannerButtonStyle>
      <BannerIndicatorStyle>
        {banners.map((_, index) => (
          <span
            onClick={() => handleIndicatorClick(index)}
            key={index}
            className={index === currentIndex ? "active" : ""}
          />
        ))}
      </BannerIndicatorStyle>
    </Bannertyle>
  );
}
const Bannertyle = styled.div`
  overflow: hidden;
  position: relative;
`;

interface BannerContainerStyleProps {
  $transFormValue: number;
}
const BannerContainerStyle = styled.div<BannerContainerStyleProps>`
  display: flex;
  transform: translateX(${(props) => props.$transFormValue}%);
  transition: transform 0.5s ease-in-out;
`;

const BannerButtonStyle = styled.div`
  button {
    border: none;
    width: 50px;
    height: 50px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 500px;
    font-style: 2rem;
    cursor: pointer;

    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    &.prev {
      left: 10px;
    }

    &.next {
      right: 10px;
    }

    svg {
      fill: #fff;
    }
  }
`;

const BannerIndicatorStyle = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%); // 가운데 정렬
  span {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #ccc;
    margin: 0 5px;
    cursor: pointer;

    &.active {
      background: ${({ theme }) => theme.color.primary};
    }
  }
`;

export default Banner;
