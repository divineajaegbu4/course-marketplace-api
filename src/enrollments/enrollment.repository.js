import { Finder } from "../utils/finder.js";
import { Identifier } from "../utils/identifier.js";
import { QueryFilter } from "../utils/queryFilter.js";

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
    return await Finder.findItem(this.enrollmentDB, "id", id);
  }

  async findEnrollmentByUserId(userId) {
    return await QueryFilter.filter(this.enrollmentDB, "user_id", userId);
  }

  async findEnrollmentByCourseId(courseId) {
    return await QueryFilter.filter(this.enrollmentDB, "course_id", courseId);
  }

  async findEnrollmentByProgress(progress) {
    return await QueryFilter.filter(this.enrollmentDB, "progress", progress);
  }

  async updateEnrollment(id, updatedData) {
    const enrollmentIndex = await Finder.findIndex(this.enrollmentDB, "id", id);

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
    const enrollmentIndex = await Finder.findIndex(this.enrollmentDB, "id", id);

    if (enrollmentIndex !== -1) {
      this.enrollmentDB.splice(enrollmentIndex, 1);

      return true;
    }

    return false;
  }
}
