export declare class AuthConfig {
    static readonly jwt: {
        access: {
            secret: string;
            expiresIn: string;
            issuer: string;
            audience: string;
            algorithm: string;
            clockTolerance: number;
        };
        refresh: {
            secret: string;
            expiresIn: string;
            rotation: boolean;
            reuseDetection: boolean;
            hash: boolean;
            maxActivePerUser: number;
            store: "db" | "redis";
        };
    };
}
