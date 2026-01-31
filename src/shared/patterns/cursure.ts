export class Cursor {
     static encode(id: string | number): string {
          return Buffer.from(id.toString()).toString('base64url');
     }

     static decode(cursor: string): string {
          return Buffer.from(cursor, 'base64url').toString('utf-8');
     }
}
