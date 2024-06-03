import dayjs from "dayjs";

export const formatNumber = (number: number) => {
  return number.toLocaleString();
};

export const formatDate = (date: string, format?: string) => {
  // dayjs는 굉장히 가볍다
  return dayjs(date).format(format ? format : "YYYY년 MM월 DD일");
};
