import { setupWorker } from "msw/browser";
import { addReview, reveiwsById, reviewForMain } from "./review";
import { bestBooks } from "./books";
import { banners } from "./banner";

const handlers = [reveiwsById, addReview, reviewForMain, bestBooks, banners];

export const worker = setupWorker(...handlers);
