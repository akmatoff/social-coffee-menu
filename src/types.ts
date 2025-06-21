export enum CategoryType {
  DEFAULT = "DEFAULT",
  TWO_IN_A_ROW = "TWO_IN_A_ROW",
  TEXT_BASED = "TEXT_BASED",
}

export type Category = {
  id: number;
  name: string;
  description: string;
  items: string[];
  category_type: CategoryType;
};

export type MenuItem = {
  id: number;
  category: number;
  category_name: string;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
};

export type PaginatedResponse<T> = {
  count: number;
  next: string;
  previous: string;
  results: T[];
};

export type CategoriesParams = {
  page?: number;
  page_size?: number;
  search?: string;
};

export type MenuItemsParams = {
  available?: boolean;
  category?: number;
  ordering?: string;
  page?: number;
  page_size?: number;
  search?: string;
};
