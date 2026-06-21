import client from './client'
import type { User } from '../types'

export const login = (username: string, password: string) =>
  client.post<{ token: string; user: User }>('/auth/login', { username, password })

export const me = () => client.get<User>('/auth/me')
