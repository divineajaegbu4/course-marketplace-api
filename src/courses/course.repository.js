import { Finder } from "../utils/finder.js";
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

  async getAllCourses(queryFilter = {}) {
    const { title, description, search } = queryFilter;

    let filteredCourses = this.courseDB;

    if (title) {
      filteredCourses = filteredCourses.filter(course => course.title.toLowerCase() === title.toLowerCase())
    }

    if (description) {
      filteredCourses = filteredCourses.filter(course => course.description.toLowerCase() === description.toLowerCase())
    }

 
    if (search) {
      filteredCourses = filteredCourses.filter(
        (course) =>
          course.title.toLowerCase().includes(search.toLowerCase()) ||
          course.description.toLowerCase().includes(search.toLowerCase()) ||
          course.price.toString().includes(search.toString())

      );
    }

    return filteredCourses;
  }

  async findCourseById(id) {
    return await Finder.findItem(this.courseDB, "id", id)
  }

  async getCourseByTitle(title) {
    return await Finder.findItem(this.courseDB, "title", title);
  }

  async updateCourse(id, updatedData) {
    const courseIndex = await Finder.findIndex(this.courseDB, "id", id);

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
    const courseIndex = await Finder.findIndex(this.courseDB, "id", id);

    if (courseIndex === -1) {
      return false;
    }

    this.courseDB.splice(courseIndex, 1);

    return true;
  }
}
