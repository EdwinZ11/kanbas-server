import { v4 as uuidv4 } from "uuid";
import model from "./model.js";
import EnrollmentsDao from "../enrollments/dao.js";

export default function CoursesDao() {
  const enrollmentsDao = EnrollmentsDao();

  const findAllCourses = async () => {
    return model.find({}, { name: 1, description: 1 });
  };

  const findCourseById = async (courseId) => {
    return model.findById(courseId);
  };

  const findCoursesForEnrolledUser = async (userId) => {
    const courses = await enrollmentsDao.findCoursesForUser(userId);
    return courses.map((course) => ({
      _id: course._id,
      name: course.name,
      description: course.description,
    }));
  };

  const createCourse = async (course) => {
    const { _id, ...courseWithoutId } = course;
    const newCourse = { ...courseWithoutId, _id: uuidv4() };
    return model.create(newCourse);
  };

  const deleteCourse = async (courseId) => {
    return model.deleteOne({ _id: courseId });
  };

  const updateCourse = async (courseId, courseUpdates) => {
    return model.updateOne({ _id: courseId }, { $set: courseUpdates });
  };

  return {
    findAllCourses,
    findCourseById,
    findCoursesForEnrolledUser,
    createCourse,
    deleteCourse,
    updateCourse,
  };
}