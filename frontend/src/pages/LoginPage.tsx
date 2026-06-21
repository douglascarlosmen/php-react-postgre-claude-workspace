import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuthStore } from '../store/authStore'
import * as authApi from '../api/auth'

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const setAuth = useAuthStore((s) => s.setAuth)
  const navigate = useNavigate()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!username || !password) return
    setLoading(true)
    try {
      const res = await authApi.login(username, password)
      setAuth(res.data.user, res.data.token)
      toast.success('Bem-vindo!')
      navigate('/projects')
    } catch {
      toast.error('Usuário ou senha incorretos')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4 shadow-card">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-text-primary">Elegance Kanban</h1>
          <p className="text-text-secondary text-sm mt-1">Gerencie seus projetos com elegância</p>
        </div>

        <div className="bg-card rounded-2xl shadow-card p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Usuário</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Seu usuário"
                autoFocus
                className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Sua senha"
                className="w-full px-3.5 py-2.5 rounded-lg border border-border text-sm text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !username || !password}
              className="w-full py-2.5 bg-primary hover:bg-primary-hover text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>
          <p className="text-xs text-text-secondary text-center mt-4">
            Credenciais padrão: <span className="font-mono">admin</span> / <span className="font-mono">password</span>
          </p>
        </div>
      </div>
    </div>
  )
}
