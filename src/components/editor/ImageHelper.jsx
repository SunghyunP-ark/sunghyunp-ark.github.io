import { useRef, useState } from 'react'
import { uploadImageFile } from '../../lib/githubApi.js'
import './ImageHelper.css'

export default function ImageHelper({ onInsert }) {
  const fileRef = useRef(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const handleFile = async (e) => {
    const file = e.target.files[0]
    if (!file) return
    setError('')
    const token = localStorage.getItem('github_pat')
    if (!token) {
      setError('No GitHub PAT set. Click the ⚙ icon to add your token.')
      return
    }

    setUploading(true)
    try {
      const reader = new FileReader()
      reader.onload = async () => {
        const base64 = reader.result.split(',')[1]
        await uploadImageFile({ token, filename: file.name, base64Content: base64 })
        const mdSnippet = `![${file.name}](static/img/${file.name})`
        onInsert(mdSnippet)
        setUploading(false)
      }
      reader.readAsDataURL(file)
    } catch (err) {
      setError(err.message)
      setUploading(false)
    }
    e.target.value = ''
  }

  return (
    <div className="img-helper">
      <button
        className="img-helper__btn btn-outline"
        onClick={() => fileRef.current?.click()}
        disabled={uploading}
        title="Upload image and insert markdown"
      >
        <i className={uploading ? 'fas fa-spinner fa-spin' : 'fas fa-image'} />
        {uploading ? 'Uploading…' : 'Insert Image'}
      </button>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFile}
      />
      {error && <span className="img-helper__error">{error}</span>}
    </div>
  )
}
