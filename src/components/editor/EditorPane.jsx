import CodeMirror from '@uiw/react-codemirror'
import { markdown } from '@codemirror/lang-markdown'
import { oneDark } from '@codemirror/theme-one-dark'
import { EditorView } from '@codemirror/view'
import './EditorPane.css'

const customTheme = EditorView.theme({
  '&': {
    backgroundColor: 'var(--surface)',
    height: '100%',
    fontSize: '14px',
  },
  '.cm-scroller': {
    fontFamily: 'var(--font-code)',
    lineHeight: '1.7',
  },
  '.cm-gutters': {
    backgroundColor: 'var(--surface-2)',
    borderRight: '1px solid var(--border)',
    color: 'var(--muted)',
  },
  '.cm-activeLineGutter': { backgroundColor: 'transparent' },
  '.cm-activeLine': { backgroundColor: 'rgba(0,180,216,0.04)' },
  '.cm-cursor': { borderLeftColor: 'var(--accent)' },
  '.cm-selectionBackground': { backgroundColor: 'rgba(0,180,216,0.18) !important' },
})

export default function EditorPane({ value, onChange, editorRef }) {
  return (
    <div className="editor-pane">
      <div className="editor-pane__header">
        <span className="editor-pane__label">
          <i className="fas fa-pen-nib" /> Markdown
        </span>
      </div>
      <div className="editor-pane__cm">
        <CodeMirror
          value={value}
          onChange={onChange}
          extensions={[markdown(), customTheme]}
          theme={oneDark}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLine: true,
            foldGutter: false,
          }}
          style={{ height: '100%' }}
          ref={editorRef}
        />
      </div>
    </div>
  )
}
