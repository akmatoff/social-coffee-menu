import axios from "axios";
import type { MenuItem, PaginatedResponse } from "../types";
import { ENDPOINTS } from "../endpoints";

export default async function getMenuItems() {
  return axios.get<PaginatedResponse<MenuItem>>(ENDPOINTS.MENU_ITEMS);
}
