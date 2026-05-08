import { Identifier } from "../utils/identifier.js";

export class EnrollmentRepository {
  constructor(enrollmentDB) {
    this.enrollmentDB = enrollmentDB;
  }

  async createEnrollment(enrollmentData) {
    enrollmentData.id = Identifier.generateId();

    this.enrollmentDB.push(enrollmentData);

    return enrollmentData;
  }

  async getAllEnrollments(queryFilter = {}) {
    const search = queryFilter.search;

    let filteredEnrollments = this.enrollmentDB;

    if (search) {
      filteredEnrollments = filteredEnrollments.filter((enrollment) => {
        if (!enrollment.progress || enrollment.progress === null) {
          return false;
        }
        return enrollment.progress.toString().includes(search.toString());
      });
    }

    return filteredEnrollments;
  }

  async findEnrollmentById(id) {
    return this.enrollmentDB.find((enrollment) => enrollment.id === id);
  }

  async findEnrollmentByUserId(userId) {
    return this.enrollmentDB.filter(
      (enrollment) => enrollment.user_id === userId,
    );
  }

  async findEnrollmentByCourseId(courseId) {
    return this.enrollmentDB.filter(
      (enrollment) => enrollment.course_id === courseId,
    );
  }

  async findEnrollmentByProgress(progress) {
    return this.enrollmentDB.filter(
      (enrollment) => enrollment.progress === progress,
    );
  }

  async updateEnrollment(id, updatedData) {
    const enrollmentIndex = this.enrollmentDB.findIndex(
      (enrollment) => enrollment.id === id,
    );

    if (enrollmentIndex !== -1) {
      this.enrollmentDB[enrollmentIndex] = {
        ...this.enrollmentDB[enrollmentIndex],
        ...updatedData,
      };
      return this.enrollmentDB[enrollmentIndex];
    }

    return null;
  }

  async deleteEnrollment(id) {
    const enrollmentIndex = this.enrollmentDB.findIndex(
      (enrollment) => enrollment.id === id,
    );

    if (enrollmentIndex !== -1) {
      this.enrollmentDB.splice(enrollmentIndex, 1);

      return true;
    }

    return false;
  }
}
