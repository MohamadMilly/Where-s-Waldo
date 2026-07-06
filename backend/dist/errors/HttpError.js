export class HttpError extends Error {
    statusCode;
    constructor(status, message) {
        super(message);
        this.statusCode = status;
    }
}
