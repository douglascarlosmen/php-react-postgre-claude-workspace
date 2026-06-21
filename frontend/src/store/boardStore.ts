import { create } from 'zustand'
import type { Column, Task } from '../types'
import * as columnsApi from '../api/columns'
import * as tasksApi from '../api/tasks'

interface BoardState {
  columns: Column[]
  loading: boolean
  fetchBoard: (boardId: number) => Promise<void>
  addColumn: (boardId: number, name: string) => Promise<void>
  removeColumn: (id: number) => void
  setColumns: (columns: Column[]) => void
  addTask: (columnId: number, title: string) => Promise<Task>
  moveTask: (taskId: number, fromColumnId: number, toColumnId: number, newOrder: number) => Promise<void>
  removeTask: (columnId: number, taskId: number) => void
  updateTaskInList: (task: Task) => void
}

export const useBoardStore = create<BoardState>((set, get) => ({
  columns: [],
  loading: false,

  fetchBoard: async (boardId) => {
    set({ loading: true })
    const res = await columnsApi.listColumns(boardId)
    set({ columns: res.data, loading: false })
  },

  addColumn: async (boardId, name) => {
    const res = await columnsApi.createColumn(boardId, name)
    set((s) => ({ columns: [...s.columns, res.data] }))
  },

  removeColumn: (id) => {
    columnsApi.deleteColumn(id)
    set((s) => ({ columns: s.columns.filter((c) => c.id !== id) }))
  },

  setColumns: (columns) => set({ columns }),

  addTask: async (columnId, title) => {
    const res = await tasksApi.createTask(columnId, title)
    const task = res.data
    set((s) => ({
      columns: s.columns.map((c) =>
        c.id === columnId ? { ...c, tasks: [...c.tasks, task] } : c
      ),
    }))
    return task
  },

  moveTask: async (taskId, fromColumnId, toColumnId, newOrder) => {
    const state = get()
    const fromCol = state.columns.find((c) => c.id === fromColumnId)
    const task = fromCol?.tasks.find((t) => t.id === taskId)
    if (!task) return

    set((s) => ({
      columns: s.columns.map((c) => {
        if (c.id === fromColumnId) {
          return { ...c, tasks: c.tasks.filter((t) => t.id !== taskId) }
        }
        if (c.id === toColumnId) {
          const updated = { ...task, column_id: toColumnId, position_order: newOrder }
          const tasks = [...c.tasks, updated].sort((a, b) => a.position_order - b.position_order)
          return { ...c, tasks }
        }
        return c
      }),
    }))

    try {
      await tasksApi.moveTask(taskId, toColumnId, newOrder)
    } catch {
      set((s) => ({
        columns: s.columns.map((c) => {
          if (c.id === fromColumnId) return { ...c, tasks: [...c.tasks, task] }
          if (c.id === toColumnId) return { ...c, tasks: c.tasks.filter((t) => t.id !== taskId) }
          return c
        }),
      }))
    }
  },

  removeTask: (columnId, taskId) => {
    tasksApi.deleteTask(taskId)
    set((s) => ({
      columns: s.columns.map((c) =>
        c.id === columnId ? { ...c, tasks: c.tasks.filter((t) => t.id !== taskId) } : c
      ),
    }))
  },

  updateTaskInList: (task) => {
    set((s) => ({
      columns: s.columns.map((c) =>
        c.id === task.column_id
          ? { ...c, tasks: c.tasks.map((t) => (t.id === task.id ? { ...t, ...task } : t)) }
          : c
      ),
    }))
  },
}))
