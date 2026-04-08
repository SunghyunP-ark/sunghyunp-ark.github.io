import './FrontMatterForm.css'

export default function FrontMatterForm({ values, onChange }) {
  const set = (key, val) => onChange({ ...values, [key]: val })

  return (
    <div className="fm-form">
      <h4 className="fm-form__heading">Front Matter</h4>

      <div className="fm-field">
        <label className="fm-label">Title *</label>
        <input
          className="fm-input"
          type="text"
          placeholder="Post title"
          value={values.title}
          onChange={e => set('title', e.target.value)}
        />
      </div>

      <div className="fm-row">
        <div className="fm-field">
          <label className="fm-label">Date *</label>
          <input
            className="fm-input"
            type="date"
            value={values.date}
            onChange={e => set('date', e.target.value)}
          />
        </div>
        <div className="fm-field">
          <label className="fm-label">Category</label>
          <input
            className="fm-input"
            type="text"
            placeholder="e.g. AI/Diffusion"
            value={values.category}
            onChange={e => set('category', e.target.value)}
          />
        </div>
      </div>

      <div className="fm-field">
        <label className="fm-label">Thumbnail image path</label>
        <input
          className="fm-input"
          type="text"
          placeholder="static/img/my-thumbnail.png"
          value={values.image}
          onChange={e => set('image', e.target.value)}
        />
      </div>

      <div className="fm-field">
        <label className="fm-label">Summary</label>
        <textarea
          className="fm-input fm-textarea"
          rows={3}
          placeholder="Brief description (auto-generated if empty)"
          value={values.summary}
          onChange={e => set('summary', e.target.value)}
        />
      </div>
    </div>
  )
}
