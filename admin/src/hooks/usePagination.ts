import { useState } from "react";

export function usePagination(initial = 1) {
  const [page, setPage] = useState(initial);
  return { page, setPage };
}
