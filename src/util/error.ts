const status = require('http-status');

import { Status } from "./status";
import { Message } from "./message";

/**
 * @extends Error
 */
class ApplicationError extends Error {

    public status: string;
    public isPublic: string;
    public isOperational: boolean;

    constructor(message, status, isPublic) {
        super(message);
        this.name = this.constructor.name;
        this.message = message;
        this.status = status;
        this.isPublic = isPublic;
        this.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
        Error.captureStackTrace(this);
    }
}




/**
 * Class representing an API error.
 * @extends ApplicationError
 */
class ApiError extends ApplicationError {
    /**
     * Creates an API error.
     * @param {string} message - Error message.
     * @param {number} status - HTTP status code of error.
     * @param {boolean} isPublic - Whether the message should be visible to user or not.
     */
    constructor(message, status = 500, isPublic = false) {
        super(message, status, isPublic);
    }
}


export class AuthenticationError extends ApiError {
    constructor(message=Message.INAVALID_USERNAME, status = Status.UNPROCESSABLE_ENTITY , isPublic = true){
        super(message, status, isPublic)
    }
}

export class RecordNotFoundError extends ApiError {
    constructor(message= Message.NOTE_FOUND, status = Status.NOT_FOUND){
        super(message, status, true)
    }
}

export class InvalidCredentialError extends ApiError {
    constructor(message=Message.INVALID_CREDENTIALS, status = Status.UNPROCESSABLE_ENTITY){
        super(message, status, true)
    }
}

export class UnprocessableEntityError extends ApiError {
    constructor(message = Message.INVALID_TOKEN, status = 422){
        super(message, status, true)
    }
}

export class MissingTokenError extends ApiError {
    constructor(message = Message.MISSING_TOKEN, status = Status.NOT_ACCEPTABLE){
        super(message, status, true)
    }
}

export class UnauthorizedError extends ApiError {
    constructor(message = Message.UNAUTHORIZED, status = Status.UNAUTHORIZED){
        super(message, status, true)
    }
}

export class AccountExistError extends ApiError {
    constructor(message = Message.ACCOUNT_EXIST, status = Status.CONFLICT){
        super(message, status, true)
    }
}

export class ValidationError extends ApiError {
    constructor(message = Message.INVALID_PAYLOAD, status = Status.UNPROCESSABLE_ENTITY){
        super(message, status, true)
    }
}
