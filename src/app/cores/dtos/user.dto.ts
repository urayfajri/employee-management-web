export interface UserDTO {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  token: string;
}

export const userDefault = {
  id: 0,
  username: '',
  password: '',
  firstName: '',
  lastName: '',
  token: '',
};
