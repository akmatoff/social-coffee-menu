import axios from "axios";
import { ENDPOINTS } from "../endpoints";
import type { Category, PaginatedResponse } from "../types";

export default async function getCategories() {
  return axios.get<PaginatedResponse<Category>>(ENDPOINTS.MENU_CATEGORIES);
}
