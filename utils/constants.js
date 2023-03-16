// eslint-disable-next-line import/prefer-default-export
export const ROUTE_PATH = {
  list: () => '/',
  fact: (id) => (id ? `/fact/${id}` : '/fact/:id'),
};
