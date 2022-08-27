import QueryString from 'qs';

export function generateUrl(path: string, q?: QueryString.ParsedQs): string {
  let query: string = QueryString.stringify(q);
  query &&= `?${query}`;

  return `${process.env.API_BASE_URL}${path}${query}`;
}
