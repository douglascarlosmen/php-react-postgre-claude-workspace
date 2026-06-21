import { useEffect, useState, Suspense, lazy } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useBoardStore } from '../store/boardStore'
import { useTaskStore } from '../store/taskStore'
import { useProjectStore } from '../store/projectStore'
import KanbanBoard from '../components/kanban/KanbanBoard'
import SkeletonBoard from '../components/ui/SkeletonBoard'

const TaskModal = lazy(() => import('../components/task/TaskModal'))

export default function BoardPage() {
  const { boardId } = useParams<{ boardId: string }>()
  const navigate = useNavigate()
  const { fetchBoard, loading } = useBoardStore()
  const { clearTask } = useTaskStore()
  const { boards, projects } = useProjectStore()
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null)

  // Find board and its parent project
  const allBoards = Object.entries(boards)
  const boardEntry = allBoards.find(([, bs]) => bs.some((b) => b.id === Number(boardId)))
  const board = boardEntry?.[1].find((b) => b.id === Number(boardId))
  const projectId = boardEntry ? Number(boardEntry[0]) : null
  const project = projectId ? projects.find((p) => p.id === projectId) : null
  const boardName = board?.name ?? 'Board'

  useEffect(() => {
    if (boardId) fetchBoard(Number(boardId))
    return () => clearTask()
  }, [boardId])

  function handleCardClick(taskId: number) {
    setSelectedTaskId(taskId)
  }

  function handleCloseModal() {
    setSelectedTaskId(null)
    clearTask()
  }

  if (loading) return <SkeletonBoard />

  return (
    <div className="h-full flex flex-col">
      <KanbanBoard
        boardName={boardName}
        project={project ?? null}
        projectId={projectId}
        onCardClick={handleCardClick}
        onBack={() => projectId ? navigate(`/projects/${projectId}`) : navigate('/projects')}
      />
      {selectedTaskId && (
        <Suspense fallback={null}>
          <TaskModal taskId={selectedTaskId} onClose={handleCloseModal} />
        </Suspense>
      )}
    </div>
  )
}
