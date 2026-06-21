import axios from 'axios'
import toast from 'react-hot-toast'

const client = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('kanban_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

client.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg = err.response?.data?.error || 'Erro inesperado'
    if (err.response?.status !== 401) toast.error(msg)
    return Promise.reject(err)
  }
)

export default client
