import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

//3 cases:
//1-The default language is defined: use the default language
//2-The default language is undefined, but a query param is defined: use the query param
//3-The default language and the query param are undefined: use language en
export function useLanguage(defaultLanguage) {
  let query = useQuery();
  if (defaultLanguage !== undefined) {
    return defaultLanguage || "en";
  }
  return query.get("lang") || "en";
}
