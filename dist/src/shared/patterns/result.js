"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = void 0;
const cursure_1 = require("./cursure");
const httpStatusCode_1 = require("../../../utilities/httpStatusCode");
class Result {
    constructor(data = null, message = "", isSuccess = true, statusCode = 200, errorCode) {
        this.data = data;
        this.message = message;
        this.isSuccess = isSuccess;
        this.statusCode = statusCode;
        this.timestamp = new Date().toISOString();
        this.errorCode = errorCode;
    }
    static success(data, message = "", statusCode = httpStatusCode_1.HttpStatusCode.OK) {
        return new Result(data, message, true, statusCode);
    }
    static failure(message, statusCode = httpStatusCode_1.HttpStatusCode.BAD_REQUEST, errorCode) {
        return new Result(null, message, false, statusCode, errorCode);
    }
    static cursorPaginated(items, limit, hasNextPage, idField = "id", message = "Data retrieved", totalCount) {
        const nextCursor = items.length > 0 ? cursure_1.Cursor.encode(items[items.length - 1][idField]) : undefined;
        return new Result({ items, nextCursor, hasNextPage, totalCount }, message, true, httpStatusCode_1.HttpStatusCode.OK);
    }
    static paginated(items, page, limit, totalItems, message = "Data retrieved") {
        const totalPages = Math.ceil(totalItems / limit);
        return new Result({
            items,
            page,
            limit,
            totalItems,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
        }, message, true, httpStatusCode_1.HttpStatusCode.OK);
    }
}
exports.Result = Result;
//# sourceMappingURL=result.js.map