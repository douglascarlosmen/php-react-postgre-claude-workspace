import client from './client'
import type { Project, Board } from '../types'

export const listProjects = () => client.get<Project[]>('/projects')
export const createProject = (name: string) => client.post<Project>('/projects', { name })
export const updateProject = (id: number, name: string) => client.put<Project>(`/projects/${id}`, { name })
export const deleteProject = (id: number) => client.delete(`/projects/${id}`)

export const listBoards = (projectId: number) => client.get<Board[]>(`/projects/${projectId}/boards`)
export const createBoard = (projectId: number, name: string) =>
  client.post<Board>(`/projects/${projectId}/boards`, { name })
export const updateBoard = (id: number, name: string) => client.put<Board>(`/boards/${id}`, { name })
export const deleteBoard = (id: number) => client.delete(`/boards/${id}`)
