import client from './client'
import type { Task, TaskDetail } from '../types'

export const createTask = (columnId: number, title: string) =>
  client.post<Task>(`/columns/${columnId}/tasks`, { title })

export const getTask = (id: number) => client.get<TaskDetail>(`/tasks/${id}`)

export const updateTask = (id: number, data: Partial<Omit<TaskDetail, 'id' | 'subtasks'>>) =>
  client.put<Task>(`/tasks/${id}`, data)

export const deleteTask = (id: number) => client.delete(`/tasks/${id}`)

export const moveTask = (id: number, column_id: number, position_order: number) =>
  client.patch<Task>(`/tasks/${id}/move`, { column_id, position_order })
