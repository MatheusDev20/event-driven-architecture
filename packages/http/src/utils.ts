export const convertQueryParams = (path: string, params: object): string => {
  return (
    `${path}?` +
    Object.entries(params)
      .map(([key, value]) => `${key}=${value}`)
      .join('&')
  );
};