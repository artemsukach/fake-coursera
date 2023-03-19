export const getPathWithoutPage = (path) => {
  const regexp = /\/\w+\/\w+\//;

  return path.match(regexp)?.[0];
};
