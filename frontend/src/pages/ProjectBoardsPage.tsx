import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProjectStore } from '../store/projectStore'
import toast from 'react-hot-toast'

export default function ProjectBoardsPage() {
  const { projectId } = useParams<{ projectId: string }>()
  const navigate = useNavigate()
  const { projects, boards, fetchBoards, addBoard, removeBoard } = useProjectStore()
  const [showForm, setShowForm] = useState(false)
  const [boardName, setBoardName] = useState('')
  const [loading, setLoading] = useState(false)

  const id = Number(projectId)
  const project = projects.find((p) => p.id === id)
  const projectBoards = boards[id] ?? []

  useEffect(() => {
    if (id) fetchBoards(id)
  }, [id])

  async function handleCreateBoard() {
    if (!boardName.trim()) return
    setLoading(true)
    try {
      const board = await addBoard(id, boardName.trim())
      toast.success('Board criado com sucesso')
      setBoardName('')
      setShowForm(false)
      navigate(`/boards/${board.id}`)
    } finally {
      setLoading(false)
    }
  }

  async function handleDeleteBoard(boardId: number, e: React.MouseEvent) {
    e.stopPropagation()
    if (!confirm('Excluir este board e todas suas colunas e tarefas?')) return
    await removeBoard(id, boardId)
    toast.success('Board excluído')
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Breadcrumb + back navigation */}
      <div className="flex items-center gap-2 mb-6 text-sm">
        <button
          onClick={() => navigate('/projects')}
          className="flex items-center gap-1.5 text-text-secondary hover:text-primary transition-colors font-medium"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Projetos
        </button>
        <svg className="w-3.5 h-3.5 text-border" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-text-primary font-semibold truncate">{project?.name ?? 'Projeto'}</span>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">{project?.name ?? 'Projeto'}</h1>
          <p className="text-text-secondary text-sm mt-1">
            {projectBoards.length === 0
              ? 'Nenhum board ainda — crie o primeiro'
              : `${projectBoards.length} board${projectBoards.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Novo Board
        </button>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-xl p-4 mb-6 shadow-card">
          <h2 className="text-sm font-semibold text-text-primary mb-3">Novo board</h2>
          <div className="flex gap-2">
            <input
              autoFocus
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCreateBoard()
                if (e.key === 'Escape') setShowForm(false)
              }}
              placeholder="Nome do board (ex: Sprint 1, Backlog)"
              className="flex-1 px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
            <button
              onClick={handleCreateBoard}
              disabled={loading || !boardName.trim()}
              className="px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-hover transition-colors disabled:opacity-50"
            >
              Criar
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-3 py-2 text-sm text-text-secondary hover:text-text-primary border border-border rounded-lg hover:bg-surface transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {projectBoards.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M4 6h16M4 10h16M4 14h16M4 18h16" />
            </svg>
          </div>
          <p className="text-text-primary font-semibold">Nenhum board ainda</p>
          <p className="text-text-secondary text-sm mt-1">Crie seu primeiro board para organizar tarefas</p>
          <button
            onClick={() => setShowForm(true)}
            className="mt-4 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg hover:bg-primary-hover transition-colors"
          >
            Criar primeiro board
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projectBoards.map((board) => (
            <div
              key={board.id}
              onClick={() => navigate(`/boards/${board.id}`)}
              className="bg-card rounded-xl border border-border shadow-card p-5 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 bg-primary-light rounded-xl flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </div>
                <button
                  onClick={(e) => handleDeleteBoard(board.id, e)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-text-secondary hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              <h3 className="font-semibold text-text-primary">{board.name}</h3>
              <p className="text-xs text-text-secondary mt-1">
                {new Date(board.created_at).toLocaleDateString('pt-BR')}
              </p>
              <div className="flex items-center gap-1 mt-3 text-xs text-primary font-medium">
                <span>Abrir board</span>
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
