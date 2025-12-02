export type UserRole = 'USER' | 'ADMIN'; // mở rộng nếu có thêm role khác

export interface User {
  id: number;
  createdAt: string; // hoặc Date nếu bạn parse lên
  updatedAt: string;
  deletedAt: string | null;
  email: string;
  name: string;
  role: UserRole;
  userName: string;
  phone: string;
  hasAddress: boolean;
  resetCode: string | null;
  resetCodeExpiry: string | null;
}
