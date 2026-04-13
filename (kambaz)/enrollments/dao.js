import model from "./model.js";

export default function EnrollmentsDao() {
  const findCoursesForUser = async (userId) => {
    const enrollments = await model.find({ user: userId }).populate("course");
    return enrollments.map((enrollment) => enrollment.course);
  };

  const findUsersForCourse = async (courseId) => {
    const enrollments = await model.find({ course: courseId }).populate("user");
    return enrollments.map((enrollment) => enrollment.user);
  };

  const enrollUserInCourse = async (userId, courseId) => {
    const existingEnrollment = await model.findOne({
      user: userId,
      course: courseId,
    });
    if (existingEnrollment) return existingEnrollment;

    return model.create({
      _id: `${userId}-${courseId}`,
      user: userId,
      course: courseId,
    });
  };

  const unenrollUserFromCourse = async (user, course) => {
    return model.deleteOne({ user, course });
  };

  const unenrollAllUsersFromCourse = async (courseId) => {
    return model.deleteMany({ course: courseId });
  };

  const findEnrollmentsForUser = async (userId) => {
    return model.find({ user: userId });
  };

  const isUserEnrolledInCourse = async (userId, courseId) => {
    const enrollment = await model.findOne({ user: userId, course: courseId });
    return !!enrollment;
  };

  return {
    findCoursesForUser,
    findUsersForCourse,
    enrollUserInCourse,
    unenrollUserFromCourse,
    unenrollAllUsersFromCourse,
    findEnrollmentsForUser,
    isUserEnrolledInCourse,
  };
}