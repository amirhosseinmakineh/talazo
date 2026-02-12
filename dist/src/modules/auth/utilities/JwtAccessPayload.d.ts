export interface JwtAccessPayload {
    sub: string;
    username?: string;
    typ: "access";
    mobileNumber: string;
}
export interface JwtRefreshPayload {
    sub: string;
    jti: string;
    typ: "refresh";
}
