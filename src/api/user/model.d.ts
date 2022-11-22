declare namespace API {
  type LoginParam = {
    phone: string;
    password: string;
  };
  type AdminUserInfo = {
    name: string;
    avatar_url: string;
    username: string;
  };
  type UserNameInfo = {
    name?: string;
    avatar_url?: string;
  };
}
