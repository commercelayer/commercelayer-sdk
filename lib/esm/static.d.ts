import { SdkError, ApiError } from './error';
export declare const CommerceLayerStatic: {
    resources: () => readonly string[];
    isSdkError: (error: unknown) => error is SdkError;
    isApiError: (error: unknown) => error is ApiError;
};
