import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { countPostsInNode } from '../../hooks/useBlogPosts.js'
import './CategoryTree.css'

function CategoryNode({ node, activePath, onSelect, depth = 0 }) {
  const hasChildren = Object.keys(node.children).length > 0
  const isActive = activePath.length === node.path.length &&
    node.path.every((s, i) => s === activePath[i])
  const [open, setOpen] = useState(isActive)
  const count = countPostsInNode(node)

  const toggle = () => {
    setOpen(o => !o)
    onSelect(node.path)
  }

  return (
    <div className={`cat-node depth-${depth}`}>
      <button
        className={`cat-node__label ${isActive ? 'cat-node__label--active' : ''}`}
        onClick={toggle}
      >
        {hasChildren && (
          <i className={`fas fa-chevron-right cat-node__chevron ${open ? 'open' : ''}`} />
        )}
        <span className="cat-node__name">{node.name}</span>
        <span className="cat-node__count">{count}</span>
      </button>

      <AnimatePresence>
        {open && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="cat-node__children"
          >
            {Object.keys(node.children).sort().map(name => (
              <CategoryNode
                key={name}
                node={node.children[name]}
                activePath={activePath}
                onSelect={onSelect}
                depth={depth + 1}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function CategoryTree({ categoryTree, activePath, onSelect, totalCount }) {
  return (
    <nav className="cat-tree">
      <button
        className={`cat-tree__all ${activePath.length === 0 ? 'cat-tree__all--active' : ''}`}
        onClick={() => onSelect([])}
      >
        <span>All posts</span>
        <span className="cat-node__count">{totalCount}</span>
      </button>
      {Object.keys(categoryTree.children).sort().map(name => (
        <CategoryNode
          key={name}
          node={categoryTree.children[name]}
          activePath={activePath}
          onSelect={onSelect}
          depth={0}
        />
      ))}
    </nav>
  )
}
