import { useEffect, useState } from "react";
import { fetchCategory } from "../api/category.api";
import { Category } from "../models/category.model";
import { useLocation } from "react-router-dom";
import { set } from "react-hook-form";

export const useCategory = () => {
  const [category, setCategory] = useState<Category[]>([]);
  const location = useLocation();

  const setActive = () => {
    const params = new URLSearchParams(location.search);

    if (params.get("category_id")) {
      setCategory((prev) => {
        return prev.map((item) => {
          return {
            ...item,
            isActive: item.id === Number(params.get("category_id")),
          };
        });
      });
    } else {
      setCategory((prev) => {
        return prev.map((item) => {
          return {
            ...item,
            isActive: false,
          };
        });
      });
    }
  };

  useEffect(() => {
    fetchCategory().then((category) => {
      if (!category) return;

      const categoryWithAll = [{ id: null, name: "전체" }, ...category];

      setActive();
      setCategory(categoryWithAll);
    });
  }, []);

  useEffect(() => {
    // location.search가 변경될 때마다 setActive() 함수를 실행합니다.
    setActive();
  }, [location.search]);

  return { category };
};
