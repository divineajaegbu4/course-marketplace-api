import { BadRequestException } from "../exceptions/badrequest.exception.js";
import { NotFoundException } from "../exceptions/notfound.exception.js";
import { CourseDataValidator } from "./dto/course.dto.js";

export class CourseService {
    constructor(courseRepository, userRepository) {
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
    }

    async createCourse(courseData, userData) {
        const validatedData = CourseDataValidator.validateCourseData(courseData);

        if(validatedData.error) {
            throw new BadRequestException(validatedData.error.details[0].message)
        }

        const existingCourse = await this.courseRepository.getCourseByTitle(courseData.title);

        if (existingCourse) {
            throw new BadRequestException("Course with this title already exists")
        }

        const user = await this.userRepository.findByRole(userData.role)

        console.log("user", user);

        if(user.role === "instructor") {
            courseData.instructor_id = userData.id;
        }


        return await this.courseRepository.createCourse(courseData);
    }

    async getAllCourses(loginData) {
        const courses = await this.courseRepository.getAllCourses();

        if(courses.length === 0) {
            throw new NotFoundException("No courses found")
        }
 
        return courses;
    }

    async findCourseById(id) {
        const course = await this.courseRepository.findCourseById(id);

        if(!course) {
            throw new NotFoundException("Course not found with ID: " + id)
        }

        return course;
    }

    async getCourseByTitle(title) {
        const course = await this.courseRepository.getCourseByTitle(title);

        if(!course) {
            throw new NotFoundException("Course not found with title: " + title)
        }

        return course;
    }

    async updateCourse(id, updatedData) {
         const validatedData = CourseDataValidator.validateUpdateCourseData(updatedData);

        if(validatedData.error) {
            throw new BadRequestException(validatedData.error.details[0].message)
        }

        const course = await this.courseRepository.updateCourse(id, updatedData);

        console.log("course", course);

        if(!course) {
            throw new NotFoundException("Course not found with ID: " + id)
        }

        return course;
    }

    async deleteCourse(id) {
        const course = await this.courseRepository.deleteCourse(id);

        if(!course) {
            throw new NotFoundException("Course not found with ID: " + id)
        }

        return course;
    }
}
