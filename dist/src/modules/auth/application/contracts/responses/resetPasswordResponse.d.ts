export interface ResetPasswordResponse {
    userId: string;
    newPassword: string;
    resetPasswordToken: string;
}
