import axios from "axios";
import type { MenuItem, MenuItemsParams, PaginatedResponse } from "../types";
import { ENDPOINTS } from "../endpoints";

export default async function getMenuItems(params?: MenuItemsParams) {
  return axios
    .get<PaginatedResponse<MenuItem>>(ENDPOINTS.MENU_ITEMS, { params })
    .then((res) => res.data.results);
}
