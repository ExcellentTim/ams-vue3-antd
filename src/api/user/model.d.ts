declare namespace API {
  type LoginParam = {
    phone: string;
    password: string;
  };
  type AdminUserInfo = {
    name?: string;
    avatar_url?: string;
  };
}
