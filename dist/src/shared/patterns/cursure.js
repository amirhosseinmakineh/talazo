"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cursor = void 0;
class Cursor {
    static encode(id) {
        return Buffer.from(id.toString()).toString('base64url');
    }
    static decode(cursor) {
        return Buffer.from(cursor, 'base64url').toString('utf-8');
    }
}
exports.Cursor = Cursor;
//# sourceMappingURL=cursure.js.map