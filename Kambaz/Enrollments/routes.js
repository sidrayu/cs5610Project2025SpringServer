import * as enrollmentsDao from "./dao.js";
import * as coursesDao from "../Courses/dao.js";
export default function EnrollmentRoutes(app) {
  app.get("/api/enrollments/enrollments", (req, res) => {
    const enrollments = enrollmentsDao.findAllEnrollments();
    res.send(enrollments);
  });

  app.get("/api/users/:uid/courses", (req, res) => {
    const { uid } = req.params;
    const userCourses = enrollmentsDao.findCoursesForUser(uid);
    res.json(userCourses);
  });

  app.post("/api/enrollments/users/:uid/courses/:cid", (req, res) => {
    const { uid, cid } = req.params;
    enrollmentsDao.enrollUserInCourse(uid, cid);
    const course = coursesDao.findCoursesForEnrolledUser(cid);
    res.json(course);
  });

  app.delete("/api/enrollments/users/:uid/courses/:cid", (req, res) => {
    const { uid, cid } = req.params;
    enrollmentsDao.unenrollUserFromCourse(uid, cid);
    res.sendStatus(204);
  });
}

    



