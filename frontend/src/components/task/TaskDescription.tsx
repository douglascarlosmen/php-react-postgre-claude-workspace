import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'

interface Props {
  content: string
  onChange: (html: string) => void
}

export default function TaskDescription({ content, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: 'Adicione uma descrição...' }),
    ],
    content,
    onBlur: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) return null

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <div className="flex items-center gap-1 px-2 py-1.5 border-b border-border bg-surface">
        <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })} title="Título 1">
          <span className="text-xs font-bold">H1</span>
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Título 2">
          <span className="text-xs font-bold">H2</span>
        </ToolbarBtn>
        <div className="w-px h-4 bg-border mx-1" />
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Negrito">
          <strong className="text-xs">B</strong>
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Itálico">
          <em className="text-xs">I</em>
        </ToolbarBtn>
        <div className="w-px h-4 bg-border mx-1" />
        <ToolbarBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Lista">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </ToolbarBtn>
        <ToolbarBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Lista numerada">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20h14M7 12h14M7 4h14M3 20v-2M3 12V6M3 4l2 2" />
          </svg>
        </ToolbarBtn>
        <div className="w-px h-4 bg-border mx-1" />
        <ToolbarBtn onClick={() => editor.chain().focus().toggleCodeBlock().run()} active={editor.isActive('codeBlock')} title="Código">
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        </ToolbarBtn>
      </div>

      <EditorContent editor={editor} className="tiptap-editor" />

      <style>{`
        .tiptap-editor .tiptap {
          outline: none;
          min-height: 120px;
          padding: 12px;
          color: #111827;
          font-size: 14px;
          line-height: 1.6;
        }
        .tiptap-editor .tiptap p.is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          color: #6B7280;
          float: left;
          pointer-events: none;
          height: 0;
        }
        .tiptap-editor .tiptap h1 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111827;
          margin: 0.75rem 0 0.5rem;
          line-height: 1.3;
          border-bottom: 2px solid #E5E7EB;
          padding-bottom: 0.25rem;
        }
        .tiptap-editor .tiptap h2 {
          font-size: 1.2rem;
          font-weight: 600;
          color: #111827;
          margin: 0.65rem 0 0.4rem;
          line-height: 1.3;
        }
        .tiptap-editor .tiptap h3 {
          font-size: 1rem;
          font-weight: 600;
          color: #374151;
          margin: 0.5rem 0 0.3rem;
        }
        .tiptap-editor .tiptap p {
          margin: 0.25rem 0;
        }
        .tiptap-editor .tiptap strong {
          font-weight: 700;
          color: #111827;
        }
        .tiptap-editor .tiptap em {
          font-style: italic;
        }
        .tiptap-editor .tiptap ul {
          list-style-type: disc;
          padding-left: 1.4rem;
          margin: 0.4rem 0;
        }
        .tiptap-editor .tiptap ol {
          list-style-type: decimal;
          padding-left: 1.4rem;
          margin: 0.4rem 0;
        }
        .tiptap-editor .tiptap li {
          margin: 0.15rem 0;
        }
        .tiptap-editor .tiptap code {
          background: #F3F4F6;
          color: #4F46E5;
          padding: 0.15rem 0.35rem;
          border-radius: 4px;
          font-size: 0.85em;
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
        }
        .tiptap-editor .tiptap pre {
          background: #1E1E2E;
          color: #CDD6F4;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          overflow-x: auto;
          margin: 0.5rem 0;
          font-size: 0.85em;
        }
        .tiptap-editor .tiptap pre code {
          background: none;
          color: inherit;
          padding: 0;
        }
        .tiptap-editor .tiptap blockquote {
          border-left: 3px solid #4F46E5;
          padding-left: 0.75rem;
          color: #6B7280;
          margin: 0.5rem 0;
          font-style: italic;
        }
        .tiptap-editor .tiptap hr {
          border: none;
          border-top: 1px solid #E5E7EB;
          margin: 0.75rem 0;
        }
      `}</style>
    </div>
  )
}

function ToolbarBtn({ onClick, active, title, children }: {
  onClick: () => void
  active: boolean
  title: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onMouseDown={(e) => { e.preventDefault(); onClick() }}
      title={title}
      className={`w-7 h-7 flex items-center justify-center rounded text-xs transition-colors ${
        active ? 'bg-primary text-white' : 'text-text-secondary hover:text-text-primary hover:bg-card'
      }`}
    >
      {children}
    </button>
  )
}
