import { useState } from 'react'
import { useDroppable } from '@dnd-kit/core'
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { Column } from '../../types'
import { useBoardStore } from '../../store/boardStore'
import KanbanCard from './KanbanCard'
import AddTaskInline from './AddTaskInline'
import toast from 'react-hot-toast'

interface Props {
  column: Column
  onCardClick: (taskId: number) => void
}

export default function KanbanColumn({ column, onCardClick }: Props) {
  const { removeColumn, updateColumn } = useBoardStore()
  const [showAdd, setShowAdd] = useState(false)
  const [isEditingName, setIsEditingName] = useState(false)
  const [editedName, setEditedName] = useState(column.name)
  const [isUpdating, setIsUpdating] = useState(false)

  // Sortable for column reordering — listeners applied only to the drag handle (header)
  const {
    attributes,
    listeners,
    setNodeRef: setSortableRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: `col-${column.id}`,
    data: { type: 'column', column },
  })

  // Droppable so cards can be dropped onto an empty column area
  const { setNodeRef: setDropRef } = useDroppable({
    id: `col-drop-${column.id}`,
    data: { type: 'column', column },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
  }

  async function handleDeleteColumn() {
    if (!confirm(`Excluir coluna "${column.name}" e todas suas tarefas?`)) return
    removeColumn(column.id)
    toast.success('Coluna excluída')
  }

  async function handleSaveName() {
    if (!editedName.trim()) {
      toast.error('Nome da coluna não pode estar vazio')
      setEditedName(column.name)
      return
    }

    if (editedName === column.name) {
      setIsEditingName(false)
      return
    }

    setIsUpdating(true)
    try {
      await updateColumn(column.id, editedName)
      toast.success('Nome da coluna atualizado')
      setIsEditingName(false)
    } catch {
      toast.error('Erro ao atualizar nome da coluna')
      setEditedName(column.name)
    } finally {
      setIsUpdating(false)
    }
  }

  function handleCancelEdit() {
    setEditedName(column.name)
    setIsEditingName(false)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      handleSaveName()
    } else if (e.key === 'Escape') {
      handleCancelEdit()
    }
  }

  const taskIds = column.tasks.map((t) => `task-${t.id}`)

  return (
    <div
      ref={setSortableRef}
      style={style}
      className="w-72 shrink-0 flex flex-col bg-surface rounded-xl border border-border group"
      {...attributes}
    >
      {/* Drag handle for column reorder — only this element activates column drag */}
      <div
        className="flex items-center justify-between px-3 py-2.5 border-b border-border cursor-grab active:cursor-grabbing"
        {...listeners}
      >
        <div className="flex items-center gap-2 flex-1">
          <div className="w-2 h-2 rounded-full bg-primary" />
          {isEditingName ? (
            <input
              autoFocus
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleSaveName}
              disabled={isUpdating}
              className="flex-1 px-2 py-1 text-sm font-semibold bg-card border border-primary rounded focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
              onClick={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
              onDragStart={(e) => e.preventDefault()}
            />
          ) : (
            <span className="font-semibold text-sm text-text-primary">
              {column.name}
            </span>
          )}
          <span className="text-xs text-text-secondary bg-card px-1.5 py-0.5 rounded-full border border-border">
            {column.tasks.length}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={(e) => { e.stopPropagation(); setIsEditingName(true) }}
            onPointerDown={(e) => e.stopPropagation()}
            className="p-1 text-text-secondary hover:text-primary hover:bg-primary-light rounded transition-colors opacity-0 group-hover:opacity-100"
            title="Editar coluna"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleDeleteColumn() }}
            onPointerDown={(e) => e.stopPropagation()}
            className="p-1 text-text-secondary hover:text-red-500 hover:bg-red-50 rounded transition-colors opacity-0 group-hover:opacity-100"
            title="Excluir coluna"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div ref={setDropRef} className="flex-1 overflow-y-auto scrollbar-thin p-2 space-y-2 min-h-[100px]">
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          {column.tasks.map((task) => (
            <KanbanCard key={task.id} task={task} onCardClick={onCardClick} />
          ))}
        </SortableContext>
      </div>

      <div className="p-2 border-t border-border">
        {showAdd ? (
          <AddTaskInline columnId={column.id} onClose={() => setShowAdd(false)} />
        ) : (
          <button
            onClick={() => setShowAdd(true)}
            className="w-full flex items-center gap-1.5 px-2.5 py-2 text-sm text-text-secondary hover:text-primary hover:bg-primary-light rounded-lg transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Criar tarefa
          </button>
        )}
      </div>
    </div>
  )
}
