export interface User {
  id: string; // uuid
  login: string;
  username: string;
  email: string;
  role: string;
  avatarURL?: string;
}

export interface UserProfile extends User {
  firstname?: string;
  lastname?: string;
  bio?: string;
}
