"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const status = require('http-status');
const status_1 = require("./status");
const message_1 = require("./message");
/**
 * @extends Error
 */
class ApplicationError extends Error {
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
class AuthenticationError extends ApiError {
    constructor(message = message_1.Message.INAVALID_USERNAME, status = status_1.Status.UNPROCESSABLE_ENTITY, isPublic = true) {
        super(message, status, isPublic);
    }
}
exports.AuthenticationError = AuthenticationError;
class RecordNotFoundError extends ApiError {
    constructor(message = message_1.Message.NOTE_FOUND, status = status_1.Status.NOT_FOUND) {
        super(message, status, true);
    }
}
exports.RecordNotFoundError = RecordNotFoundError;
class InvalidCredentialError extends ApiError {
    constructor(message = message_1.Message.INVALID_CREDENTIALS, status = status_1.Status.UNPROCESSABLE_ENTITY) {
        super(message, status, true);
    }
}
exports.InvalidCredentialError = InvalidCredentialError;
class UnprocessableEntityError extends ApiError {
    constructor(message = message_1.Message.INVALID_TOKEN, status = 422) {
        super(message, status, true);
    }
}
exports.UnprocessableEntityError = UnprocessableEntityError;
class MissingTokenError extends ApiError {
    constructor(message = message_1.Message.MISSING_TOKEN, status = status_1.Status.NOT_ACCEPTABLE) {
        super(message, status, true);
    }
}
exports.MissingTokenError = MissingTokenError;
class UnauthorizedError extends ApiError {
    constructor(message = message_1.Message.UNAUTHORIZED, status = status_1.Status.UNAUTHORIZED) {
        super(message, status, true);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class AccountExistError extends ApiError {
    constructor(message = message_1.Message.ACCOUNT_EXIST, status = status_1.Status.CONFLICT) {
        super(message, status, true);
    }
}
exports.AccountExistError = AccountExistError;
class ValidationError extends ApiError {
    constructor(message = message_1.Message.INVALID_PAYLOAD, status = status_1.Status.UNPROCESSABLE_ENTITY) {
        super(message, status, true);
    }
}
exports.ValidationError = ValidationError;
