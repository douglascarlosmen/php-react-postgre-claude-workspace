import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProjectStore } from '../store/projectStore'
import toast from 'react-hot-toast'

export default function ProjectsPage() {
  const navigate = useNavigate()
  const { projects, addProject, removeProject } = useProjectStore()
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleCreate() {
    if (!name.trim()) return
    setLoading(true)
    try {
      await addProject(name.trim())
      toast.success('Projeto criado com sucesso')
      setName('')
      setShowForm(false)
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete(id: number, e: React.MouseEvent) {
    e.stopPropagation()
    if (!confirm('Excluir este projeto e todos seus dados?')) return
    await removeProject(id)
    toast.success('Projeto excluído')
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Projetos</h1>
          <p className="text-text-secondary text-sm mt-1">Gerencie seus projetos Kanban</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-lg transition-colors shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Novo Projeto
        </button>
      </div>

      {showForm && (
        <div className="bg-card border border-border rounded-xl p-4 mb-6 shadow-card">
          <h2 className="text-sm font-semibold text-text-primary mb-3">Novo projeto</h2>
          <div className="flex gap-2">
            <input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCreate()
                if (e.key === 'Escape') setShowForm(false)
              }}
              placeholder="Nome do projeto"
              className="flex-1 px-3 py-2 text-sm border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
            />
            <button
              onClick={handleCreate}
              disabled={loading || !name.trim()}
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

      {projects.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 bg-primary-light rounded-2xl flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" />
            </svg>
          </div>
          <p className="text-text-primary font-semibold">Nenhum projeto ainda</p>
          <p className="text-text-secondary text-sm mt-1">Crie seu primeiro projeto para começar</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => navigate('/projects')}
              className="bg-card rounded-xl border border-border shadow-card p-5 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 bg-primary-light rounded-xl flex items-center justify-center mb-3">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <button
                  onClick={(e) => handleDelete(project.id, e)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-text-secondary hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
              <h3 className="font-semibold text-text-primary">{project.name}</h3>
              <p className="text-xs text-text-secondary mt-1">
                {new Date(project.created_at).toLocaleDateString('pt-BR')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
