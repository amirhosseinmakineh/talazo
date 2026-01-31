import { HttpStatusCode } from "../../../utilities/httpStatusCode";
export declare class Result<T> {
    readonly isSuccess: boolean;
    readonly message: string;
    readonly data: T | null;
    readonly statusCode: number;
    readonly timestamp: string;
    readonly errorCode?: string;
    private constructor();
    static success<T>(data: T, message?: string, statusCode?: HttpStatusCode): Result<T>;
    static failure<T>(message: string, statusCode?: HttpStatusCode, errorCode?: string): Result<T>;
    static cursorPaginated<T>(items: T[], limit: number, hasNextPage: boolean, idField?: keyof T, message?: string, totalCount?: number): Result<{
        items: T[];
        nextCursor?: string;
        hasNextPage: boolean;
        totalCount?: number;
    }>;
    static paginated<T>(items: T[], page: number, limit: number, totalItems: number, message?: string): Result<{
        items: T[];
        page: number;
        limit: number;
        totalItems: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    }>;
}
