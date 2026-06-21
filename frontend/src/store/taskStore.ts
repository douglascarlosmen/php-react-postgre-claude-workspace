import { create } from 'zustand'
import type { TaskDetail, Subtask } from '../types'
import * as tasksApi from '../api/tasks'
import * as subtasksApi from '../api/subtasks'

interface TaskState {
  activeTask: TaskDetail | null
  loading: boolean
  loadTask: (id: number) => Promise<void>
  clearTask: () => void
  updateActive: (data: Partial<TaskDetail>) => Promise<void>
  addSubtask: (title: string) => Promise<void>
  toggleSubtask: (id: number, completed: boolean) => Promise<void>
  removeSubtask: (id: number) => Promise<void>
}

export const useTaskStore = create<TaskState>((set, get) => ({
  activeTask: null,
  loading: false,

  loadTask: async (id) => {
    set({ loading: true, activeTask: null })
    const res = await tasksApi.getTask(id)
    set({ activeTask: res.data, loading: false })
  },

  clearTask: () => set({ activeTask: null }),

  updateActive: async (data) => {
    const task = get().activeTask
    if (!task) return
    set({ activeTask: { ...task, ...data } })
    await tasksApi.updateTask(task.id, data)
  },

  addSubtask: async (title) => {
    const task = get().activeTask
    if (!task) return
    const res = await subtasksApi.createSubtask(task.id, title)
    set({ activeTask: { ...task, subtasks: [...task.subtasks, res.data] } })
  },

  toggleSubtask: async (id, completed) => {
    const task = get().activeTask
    if (!task) return
    set({
      activeTask: {
        ...task,
        subtasks: task.subtasks.map((s) =>
          s.id === id ? { ...s, is_completed: completed } : s
        ),
      },
    })
    await subtasksApi.updateSubtask(id, { is_completed: completed })
  },

  removeSubtask: async (id) => {
    const task = get().activeTask
    if (!task) return
    set({ activeTask: { ...task, subtasks: task.subtasks.filter((s) => s.id !== id) } })
    await subtasksApi.deleteSubtask(id)
  },
}))
