import { UserStatus } from "../../domain/entities/userStatus";

export interface ResetPasswordResponse {
  userId: string;
  newPassword: string;
  resetPasswordToken: string;
}

export interface Registerresponse {
  userName: string;
  mobileNumber: string;
  userStatuse: UserStatus;
  isDeleted: boolean;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
}
