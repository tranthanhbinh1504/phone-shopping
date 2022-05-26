import { User } from './user.model'

export interface JWT {
  refreshToken: string
  token: string
}

export interface AuthResponse {
  jwt: JWT
  user: User
}

export interface RegisterResponse {
  user: User
}
