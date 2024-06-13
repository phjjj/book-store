import { Banner } from "@/models/banner.model";
import { HttpResponse, http } from "msw";

const bannersData: Banner[] = [
  {
    id: 1,
    title: "배너1 제목",
    description: "배너1 설명",
    image: "https://picsum.photos/id/111/1200/400",
    url: "http://some.url",
    target: "_blank",
  },
  {
    id: 2,
    title: "배너1 제목",
    description: "배너1 설명",
    image: "https://picsum.photos/id/11/1200/400",
    url: "http://some.url",
    target: "_self",
  },
  {
    id: 3,
    title: "배너1 제목",
    description: "배너1 설명",
    image: "https://picsum.photos/id/1/1200/400",
    url: "http://some.url",
    target: "_blank",
  },
];

export const banners = http.get("http://localhost:9999/banners", () => {
  return HttpResponse.json(bannersData, {
    status: 200,
  });
});
