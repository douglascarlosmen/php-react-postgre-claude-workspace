import client from './client'
import type { Column } from '../types'

export const listColumns = (boardId: number) => client.get<Column[]>(`/boards/${boardId}/columns`)
export const createColumn = (boardId: number, name: string) =>
  client.post<Column>(`/boards/${boardId}/columns`, { name })
export const updateColumn = (id: number, name: string) => client.put<Column>(`/columns/${id}`, { name })
export const deleteColumn = (id: number) => client.delete(`/columns/${id}`)
export const reorderColumns = (boardId: number, order: number[]) =>
  client.patch(`/boards/${boardId}/columns/reorder`, { order })
