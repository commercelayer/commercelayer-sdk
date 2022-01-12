declare enum ErrorType {
    CLIENT = "client",
    REQUEST = "request",
    RESPONSE = "response",
    GENERIC = "generic",
    CANCEL = "cancel"
}
declare class SdkError extends Error {
    static isSdkError(error: any): error is ApiError;
    type: string;
    code?: string;
    source?: Error;
    request?: any;
    constructor(error: {
        message: string;
        type?: ErrorType;
    });
}
declare class ApiError extends SdkError {
    static isApiError(error: any): error is ApiError;
    errors: any[];
    status?: number;
    constructor(error: SdkError);
    first(): any;
}
export { SdkError, ApiError, ErrorType };
