import { setupWorker } from "msw/browser";
import { addReview, reveiwsById } from "./review";

const handlers = [reveiwsById, addReview];

export const worker = setupWorker(...handlers);
