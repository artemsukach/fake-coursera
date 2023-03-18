import React, { useMemo } from 'react';
import { useLoaderData, useNavigate, useParams } from 'react-router-dom';

import { PAGE_SIZE } from '../../../utils/constants';

import CourseCard from '../../components/CourseCard/CourseCard';
import Pagination from '../../components/Pagination/Pagination';

import styles from './CoursesPage.scss';

const CoursesPage = () => {
  const {
    data: { courses },
  } = useLoaderData();

  const { page = 1 } = useParams();
  const navigate = useNavigate();

  const currentCourses = useMemo(() => {
    const firstPageIndex = (page - 1) * PAGE_SIZE;
    const lastPageIndex = firstPageIndex + PAGE_SIZE;

    return courses.slice(firstPageIndex, lastPageIndex);
  }, [page]);

  return (
    <div className={styles.courses}>
      <div className={styles.courses__list}>
        {currentCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
      <Pagination
        currentPage={Number(page)}
        totalCount={courses.length}
        pageSize={PAGE_SIZE}
        onPageChange={(page) => navigate(`../courses/page/${page}`)}
      />
    </div>
  );
};

export default CoursesPage;
