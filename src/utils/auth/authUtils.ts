
import { getAllUsers, ensureAdminUserExists } from '@/utils/users/demoUsers';

// Function to get users and ensure admin exists
export const getUsers = () => {
  console.log('Getting users from localStorage...');
  return ensureAdminUserExists();
};
