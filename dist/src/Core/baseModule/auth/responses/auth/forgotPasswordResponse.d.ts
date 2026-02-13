export interface ForgotPasswordResponse {
    resetPasswordToken: string;
    expiresInMinutes: number;
}
