import client from './client'
import type { Subtask } from '../types'

export const createSubtask = (taskId: number, title: string) =>
  client.post<Subtask>(`/tasks/${taskId}/subtasks`, { title })

export const updateSubtask = (id: number, data: { title?: string; is_completed?: boolean }) =>
  client.put<Subtask>(`/subtasks/${id}`, data)

export const deleteSubtask = (id: number) => client.delete(`/subtasks/${id}`)
