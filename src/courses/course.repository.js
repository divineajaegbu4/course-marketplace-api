import { Identifier } from "../utils/identifier.js";

export class CourseRepository {
  constructor(courseDB) {
    this.courseDB = courseDB;
  }

  async createCourse(courseData) {
    courseData.id = Identifier.generateId();

    this.courseDB.push(courseData);

    return courseData;
  }

  async getAllCourses() {
    return this.courseDB;
  }

  async findCourseById(id) {
    return this.courseDB.find((course) => course.id === id);
  }

  async getCourseByTitle(title) {
    return this.courseDB.find((course) => course.title === title);
  }

  async updateCourse(id, updatedData) {
    const courseIndex = this.courseDB.findIndex((course) => course.id === id);

    if (courseIndex === -1) {
      return null;
    }

    this.courseDB[courseIndex] = {
      ...this.courseDB[courseIndex],
      ...updatedData,
    };

    return this.courseDB[courseIndex];
  }

  async deleteCourse(id) {
    const courseIndex = this.courseDB.findIndex((course) => course.id === id);

    if (courseIndex === -1) {
      return false;
    }

    this.courseDB.splice(courseIndex, 1);

    return true;
  }
}
