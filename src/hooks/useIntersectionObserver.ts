import { useEffect, useRef } from "react";

type Callback = (entries: IntersectionObserverEntry[]) => void;

interface ObserverOptions {
  root?: Element | null; // 뷰포트
  rootMargin?: string; // 뷰포트와 관찰 대상의 경계선 사이의 여백
  threshold?: number | number[]; // 관찰 대상의 가시성 비율
}

export const useIntersectionObserver = (
  callback: Callback,
  options?: ObserverOptions
) => {
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);

    // current가 존재하면 observer.observe() 호출
    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  });

  return targetRef;
};
