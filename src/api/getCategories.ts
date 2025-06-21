import { ENDPOINTS } from "../endpoints";
import type { Category, PaginatedResponse } from "../types";
import api from "./base";

export default async function getCategories() {
  return api
    .get<PaginatedResponse<Category>>(ENDPOINTS.MENU_CATEGORIES)
    .then((res) => {
      return res.data.results;
    });
}
