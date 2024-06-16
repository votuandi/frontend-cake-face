export enum Role {
  ADMIN = 'admin',
  CLIENT = 'client',
  USER = 'user',
}

export type USER_INFORMATION_TYPE = {
  id: string
  userName: string
  name: string
  address: string
  createDate: string
  createBy: string
  updateDate: string
  updateBy: string
  note: string
  avatar: string
  phoneNumber: string
  email: string
  isActive: boolean
  role: Role
}

export type LOGIN_PAYLOAD = {
  userName: string
  password: string
}

export type LOGIN_RESPONSE = {
  user: USER_INFORMATION_TYPE
  accessToken: string
  refreshToken: string
}
