import client from '../client';

const COURSES_URL = '/core/preview-courses';

const getCourses = () => client.get(COURSES_URL);

const getCourse = (id) => client.get(`${COURSES_URL}/${id}`);

export const apiCourses = { getCourses, getCourse };
