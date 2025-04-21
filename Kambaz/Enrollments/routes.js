import * as enrollmentsDao from "./dao.js";
import * as coursesDao from "../Courses/dao.js";

export default function EnrollmentRoutes(app) {
  app.get("/api/enrollments/enrollments", async (req, res) => {
    const enrollments = await enrollmentsDao.findAllEnrollments();
    res.send(enrollments);
  });

  app.get("/api/users/:uid/courses", async (req, res) => {
    const { uid } = req.params;
    const userCourses = await enrollmentsDao.findCoursesForUser(uid);
    res.json(userCourses);
  });

  app.post("/api/enrollments/users/:uid/courses/:cid", async (req, res) => {
    const { uid, cid } = req.params;
    await enrollmentsDao.enrollUserInCourse(uid, cid);
    const course = await coursesDao.findCoursesForEnrolledUser(cid);
    res.json(course);
  });

  app.delete("/api/enrollments/users/:uid/courses/:cid", async (req, res) => {
    const { uid, cid } = req.params;
    await enrollmentsDao.unenrollUserFromCourse(uid, cid);
    res.sendStatus(204);
  });
}

    




    



