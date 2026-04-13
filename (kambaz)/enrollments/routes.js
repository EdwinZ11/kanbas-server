import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app) {
  const dao = EnrollmentsDao();

  const findMyEnrollments = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const enrollments = await dao.findEnrollmentsForUser(currentUser._id);
    res.json(enrollments);
  };

  const enrollIntoCourse = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const { courseId } = req.params;
    const enrollment = await dao.enrollUserInCourse(currentUser._id, courseId);
    res.json(enrollment);
  };

  const unenrollFromCourse = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const { courseId } = req.params;
    await dao.unenrollUserFromCourse(currentUser._id, courseId);
    res.sendStatus(200);
  };

  app.get("/api/users/current/enrollments", findMyEnrollments);
  app.post("/api/courses/:courseId/enroll", enrollIntoCourse);
  app.delete("/api/courses/:courseId/enroll", unenrollFromCourse);
}