export class HttpResponse {
    constructor(responseBody, responseLabel = "data", status = "success", error = null) {
        this[responseLabel] = responseBody;
        this.status = status;
        this.error = error;
    }
}