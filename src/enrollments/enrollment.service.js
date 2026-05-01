import { NotFoundException } from "../exceptions/notfound.exception.js";
import { EnrollmentDataValidator } from "./dto/enrollment.dto.js";

export class EnrollmentService {
  constructor(enrollmentRepository) {
    this.enrollmentRepository = enrollmentRepository;
  }

  async createEnrollment(enrollmentData) {
    const validatedData =
      EnrollmentDataValidator.validateEnrollmentData(enrollmentData);

    if (validatedData.error) {
      throw new BadRequestException(
        `Validation error: ${validatedData.error.details[0].message}`,
      );
    }

    return await this.enrollmentRepository.createEnrollment(enrollmentData);
  }

  async getAllEnrollments() {
    const enrollments = await this.enrollmentRepository.getAllEnrollments();

    if (enrollments.length === 0) {
        throw new NotFoundException("No enrollments found")
    }

    return enrollments;
  }

  async deleteEnrollment(id) {
    const deletedEnrollment = await this.enrollmentRepository.deleteEnrollment(id);

    if (!deletedEnrollment) {
        throw new NotFoundException("Enrollment not found with ID:" + id)
    }

    return deletedEnrollment;
  }
}
