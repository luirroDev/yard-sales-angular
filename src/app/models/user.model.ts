export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface UserDTO extends Omit<User, 'id'> {}
