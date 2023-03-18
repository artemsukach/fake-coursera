export const ROUTE_PATH = {
  courses: () => '/courses/page?/:page?',
  course: (id) => (id ? `/course/${id}` : '/course/:id'),
};

export const PAGE_SIZE = 10;