export interface User {
  id: number
  username: string
}

export interface Project {
  id: number
  name: string
  created_at: string
}

export interface Board {
  id: number
  project_id: number
  name: string
  created_at: string
}

export type Priority = 'low' | 'medium' | 'high'

export interface Task {
  id: number
  column_id: number
  title: string
  priority: Priority | null
  due_date: string | null
  assignee_id: number | null
  assignee_name: string | null
  position_order: number
}

export interface TaskDetail extends Task {
  description: string | null
  created_at: string
  subtasks: Subtask[]
}

export interface Subtask {
  id: number
  task_id: number
  title: string
  is_completed: boolean
}

export interface Column {
  id: number
  board_id?: number
  name: string
  position_order: number
  tasks: Task[]
}
