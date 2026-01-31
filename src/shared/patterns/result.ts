import { Cursor } from "./cursure";
import { HttpStatusCode } from "../../../utilities/httpStatusCode";

export class Result<T> {
  public readonly isSuccess: boolean;
  public readonly message: string;
  public readonly data: T | null;
  public readonly statusCode: number;
  public readonly timestamp: string;
  public readonly errorCode?: string;

  private constructor(
    data: T | null = null,
    message: string = "",
    isSuccess: boolean = true,
    statusCode: number = 200,
    errorCode?: string
  ) {
    this.data = data;
    this.message = message;
    this.isSuccess = isSuccess;
    this.statusCode = statusCode;
    this.timestamp = new Date().toISOString();
    this.errorCode = errorCode;
  }

  static success<T>(
    data: T,
    message: string = "",
    statusCode: HttpStatusCode = HttpStatusCode.OK
  ): Result<T> {
    return new Result<T>(data, message, true, statusCode);
  }

  static failure<T>(
    message: string,
    statusCode: HttpStatusCode = HttpStatusCode.BAD_REQUEST,
    errorCode?: string
  ): Result<T> {
    return new Result<T>(null, message, false, statusCode, errorCode);
  }

  static cursorPaginated<T>(
    items: T[],
    limit: number,
    hasNextPage: boolean,
    idField: keyof T = "id" as keyof T,
    message: string = "Data retrieved",
    totalCount?: number
  ): Result<{
    items: T[];
    nextCursor?: string;
    hasNextPage: boolean;
    totalCount?: number;
  }> {
    const nextCursor =
      items.length > 0 ? Cursor.encode(items[items.length - 1][idField] as any) : undefined;

    return new Result(
      { items, nextCursor, hasNextPage, totalCount },
      message,
      true,
      HttpStatusCode.OK
    );
  }

  static paginated<T>(
    items: T[],
    page: number,
    limit: number,
    totalItems: number,
    message: string = "Data retrieved"
  ): Result<{
    items: T[];
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  }> {
    const totalPages = Math.ceil(totalItems / limit);

    return new Result(
      {
        items,
        page,
        limit,
        totalItems,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
      message,
      true,
      HttpStatusCode.OK
    );
  }
}
