import { UserRole } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: UserRole;
        sub?: string;
      };
    }
    
    interface User {
      id: string;
      email: string;
      role: UserRole;
      sub?: string;
    }
  }
}

export {};
