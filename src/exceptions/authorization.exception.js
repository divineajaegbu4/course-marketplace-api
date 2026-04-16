export class AutthorizationException extends Error {
    constructor(message) {
        super(message)

        this.statusCode = 403 // Forbidden: I know who you are, but I will not allow you to access this resource because you're a user.
    }

    // Readonly property to get the status code
    // No one can change the status code after the exception is created

    get code() {
        return this.statusCode
    }
}