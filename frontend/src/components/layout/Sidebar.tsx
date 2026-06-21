import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { useProjectStore } from '../../store/projectStore'

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const logout = useAuthStore((s) => s.logout)
  const user = useAuthStore((s) => s.user)
  const { projects, boards, fetchProjects, fetchBoards, addProject, addBoard } = useProjectStore()
  const [expanded, setExpanded] = useState<Record<number, boolean>>({})
  const [newProjectName, setNewProjectName] = useState('')
  const [showNewProject, setShowNewProject] = useState(false)
  const [newBoardName, setNewBoardName] = useState<Record<number, string>>({})
  const [showNewBoard, setShowNewBoard] = useState<Record<number, boolean>>({})

  useEffect(() => {
    fetchProjects()
  }, [])

  async function handleCreateProject() {
    if (!newProjectName.trim()) return
    await addProject(newProjectName.trim())
    setNewProjectName('')
    setShowNewProject(false)
  }

  async function handleCreateBoard(projectId: number) {
    const name = newBoardName[projectId]?.trim()
    if (!name) return
    const board = await addBoard(projectId, name)
    setNewBoardName((s) => ({ ...s, [projectId]: '' }))
    setShowNewBoard((s) => ({ ...s, [projectId]: false }))
    navigate(`/boards/${board.id}`)
  }

  async function toggleProject(projectId: number) {
    if (!expanded[projectId] && !boards[projectId]) {
      await fetchBoards(projectId)
    }
    setExpanded((s) => ({ ...s, [projectId]: !s[projectId] }))
  }

  return (
    <aside className="w-64 bg-card border-r border-border flex flex-col shrink-0">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" />
            </svg>
          </div>
          <span className="font-bold text-text-primary text-sm">Elegance Kanban</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-thin p-3">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Projetos</span>
          <button
            onClick={() => setShowNewProject(true)}
            className="w-5 h-5 flex items-center justify-center rounded text-text-secondary hover:text-primary hover:bg-primary-light transition-colors"
            title="Novo projeto"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>

        {showNewProject && (
          <div className="mb-2 px-1">
            <input
              autoFocus
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCreateProject()
                if (e.key === 'Escape') setShowNewProject(false)
              }}
              placeholder="Nome do projeto"
              className="w-full px-2.5 py-1.5 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
          </div>
        )}

        <nav className="space-y-0.5">
          {projects.map((project) => (
            <div key={project.id}>
              <button
                onClick={() => toggleProject(project.id)}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-surface transition-colors group"
              >
                <svg
                  className={`w-3 h-3 shrink-0 transition-transform ${expanded[project.id] ? 'rotate-90' : ''}`}
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
                <span className="truncate flex-1 text-left font-medium">{project.name}</span>
              </button>

              {expanded[project.id] && (
                <div className="ml-4 mt-0.5 space-y-0.5">
                  {(boards[project.id] ?? []).map((board) => {
                    const isActive = location.pathname === `/boards/${board.id}`
                    return (
                      <button
                        key={board.id}
                        onClick={() => navigate(`/boards/${board.id}`)}
                        className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm transition-colors ${
                          isActive
                            ? 'bg-primary-light text-primary font-semibold'
                            : 'text-text-secondary hover:text-text-primary hover:bg-surface'
                        }`}
                      >
                        <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>
                        <span className="truncate">{board.name}</span>
                      </button>
                    )
                  })}

                  {showNewBoard[project.id] ? (
                    <input
                      autoFocus
                      value={newBoardName[project.id] ?? ''}
                      onChange={(e) => setNewBoardName((s) => ({ ...s, [project.id]: e.target.value }))}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleCreateBoard(project.id)
                        if (e.key === 'Escape') setShowNewBoard((s) => ({ ...s, [project.id]: false }))
                      }}
                      placeholder="Nome do board"
                      className="w-full px-2 py-1 text-xs border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  ) : (
                    <button
                      onClick={() => {
                        setShowNewBoard((s) => ({ ...s, [project.id]: true }))
                        if (!boards[project.id]) fetchBoards(project.id)
                      }}
                      className="w-full flex items-center gap-1.5 px-2 py-1 text-xs text-text-secondary hover:text-primary rounded-lg hover:bg-primary-light transition-colors"
                    >
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Novo board
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      <div className="p-3 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-primary-light rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-primary">
                {user?.username?.[0]?.toUpperCase() ?? 'U'}
              </span>
            </div>
            <span className="text-sm font-medium text-text-primary truncate max-w-[100px]">
              {user?.username}
            </span>
          </div>
          <button
            onClick={() => { logout(); }}
            title="Sair"
            className="p-1.5 text-text-secondary hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>
      </div>
    </aside>
  )
}
