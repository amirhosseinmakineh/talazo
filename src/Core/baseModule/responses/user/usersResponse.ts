export interface UsersResponse {
  userName: string;
  mobileNumber: string;
  createdAt?: string | null;
  updatedAt?: string | null;
  isDeleted: boolean;
  deletedAt?: string | null;
}
