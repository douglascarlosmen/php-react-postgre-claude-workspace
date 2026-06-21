import { create } from 'zustand'
import type { Project, Board } from '../types'
import * as api from '../api/projects'

interface ProjectState {
  projects: Project[]
  boards: Record<number, Board[]>
  loading: boolean
  fetchProjects: () => Promise<void>
  fetchBoards: (projectId: number) => Promise<void>
  addProject: (name: string) => Promise<Project>
  addBoard: (projectId: number, name: string) => Promise<Board>
  removeProject: (id: number) => Promise<void>
  removeBoard: (projectId: number, boardId: number) => Promise<void>
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  projects: [],
  boards: {},
  loading: false,

  fetchProjects: async () => {
    set({ loading: true })
    const res = await api.listProjects()
    set({ projects: res.data, loading: false })
  },

  fetchBoards: async (projectId) => {
    const res = await api.listBoards(projectId)
    set((s) => ({ boards: { ...s.boards, [projectId]: res.data } }))
  },

  addProject: async (name) => {
    const res = await api.createProject(name)
    set((s) => ({ projects: [res.data, ...s.projects] }))
    return res.data
  },

  addBoard: async (projectId, name) => {
    const res = await api.createBoard(projectId, name)
    set((s) => ({
      boards: {
        ...s.boards,
        [projectId]: [...(s.boards[projectId] ?? []), res.data],
      },
    }))
    return res.data
  },

  removeProject: async (id) => {
    await api.deleteProject(id)
    set((s) => ({ projects: s.projects.filter((p) => p.id !== id) }))
  },

  removeBoard: async (projectId, boardId) => {
    await api.deleteBoard(boardId)
    set((s) => ({
      boards: {
        ...s.boards,
        [projectId]: (s.boards[projectId] ?? []).filter((b) => b.id !== boardId),
      },
    }))
  },
}))
