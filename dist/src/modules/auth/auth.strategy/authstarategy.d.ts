import { Strategy } from 'passport-jwt';
export interface JwtAccessPayload {
    userId: string;
    username?: string;
    roles?: string[];
}
declare const AuthStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class AuthStrategy extends AuthStrategy_base {
    constructor();
    validate(payload: JwtAccessPayload): Promise<{
        userId: string;
        username: string | undefined;
        roles: string[];
    }>;
}
export {};
