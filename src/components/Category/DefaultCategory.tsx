import type { Category } from "../../types";

interface Props {
  category: Category;
}

export default function DefaultCategory({ category }: Props) {
  return <div>DEFAULT</div>;
}
