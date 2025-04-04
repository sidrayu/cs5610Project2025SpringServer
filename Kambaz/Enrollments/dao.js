import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function findAllEnrollments() {
  return Database.enrollments;
}

export function findCoursesForUser(userId) {
  const userEnrollments = Database.enrollments.filter(
    (enroll) => enroll.user === userId
  );
  const userCourseIds = userEnrollments.map((e) => e.course);
  return Database.courses.filter((c) => userCourseIds.includes(c._id));
}

export function enrollUserInCourse(userId, courseId) {
  const { enrollments } = Database;
  enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
};

export function unenrollUserFromCourse(userId, courseId) {
  Database.enrollments = Database.enrollments.filter(
    (enroll) => !(enroll.user === userId && enroll.course === courseId)
  );
}


