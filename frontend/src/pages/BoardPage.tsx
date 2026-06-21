import { useEffect, useState, Suspense, lazy } from 'react'
import { useParams } from 'react-router-dom'
import { useBoardStore } from '../store/boardStore'
import { useTaskStore } from '../store/taskStore'
import { useProjectStore } from '../store/projectStore'
import KanbanBoard from '../components/kanban/KanbanBoard'
import SkeletonBoard from '../components/ui/SkeletonBoard'

const TaskModal = lazy(() => import('../components/task/TaskModal'))

export default function BoardPage() {
  const { boardId } = useParams<{ boardId: string }>()
  const { fetchBoard, loading } = useBoardStore()
  const { clearTask } = useTaskStore()
  const { boards } = useProjectStore()
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null)

  const boardName = Object.values(boards)
    .flat()
    .find((b) => b.id === Number(boardId))?.name ?? 'Board'

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
      <KanbanBoard boardName={boardName} onCardClick={handleCardClick} />
      {selectedTaskId && (
        <Suspense fallback={null}>
          <TaskModal taskId={selectedTaskId} onClose={handleCloseModal} />
        </Suspense>
      )}
    </div>
  )
}
