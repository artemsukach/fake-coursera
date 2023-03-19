export const ROUTE_PATH = {
  courses: () => '/courses/page?/:page?',
  course: (id) => (id ? `/courses/${id}` : '/courses/:id'),
};

export const PAGE_SIZE = 10;

export const KEY_PLAYBACK_RATE = ['u', 'i'];