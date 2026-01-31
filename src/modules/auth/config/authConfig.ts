export class AuthConfig {
  static readonly jwt = {
    access: {
      secret: process.env.JWT_ACCESS_SECRET!,
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN ?? '15m',
      issuer: 'my-app',
      audience: 'my-app-users',
      algorithm: 'HS256',
      clockTolerance: 5,
    },

    refresh: {
      secret: process.env.JWT_REFRESH_SECRET!,
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN ?? '7d',
      rotation: true,
      reuseDetection: true,
      hash: true,
      maxActivePerUser: 5,
      store: 'db' as 'db' | 'redis',
    },
  };
}
