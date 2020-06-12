import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function useLanguage(defaultLanguage) {
  let query = useQuery();
  return query.get("lang") || "en";
}
