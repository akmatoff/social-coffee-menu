import type { MenuItem, MenuItemsParams, PaginatedResponse } from "../types";
import { ENDPOINTS } from "../endpoints";
import api from "./base";

export default async function getMenuItems(params?: MenuItemsParams) {
  return api
    .get<PaginatedResponse<MenuItem>>(ENDPOINTS.MENU_ITEMS, { params })
    .then((res) => res.data.results);
}
