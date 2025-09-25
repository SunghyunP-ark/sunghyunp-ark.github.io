---
title: Blog Posting Guide (Markdown + Categories)
date: 2025-09-25
category: Guide
---

This document explains how to write Markdown posts in the `blogs/` folder so they appear correctly in the **blog list and category buttons**.  
The blog reads the Markdown **YAML front matter** to classify posts by `title`, `date`, and `category`/`categories`.


## 1) Quick Start

1. Create a new `.md` file in the `blogs/` folder.  
2. Add the **front matter** at the very top of the file.  
3. Commit/push to `main`; the blog list and **category buttons** update automatically.

- **Single category** example
```md
---
title: World Models for Science
date: 2025-10-01
category: AI for Science
---
Body…
```

- **Multiple categories (recommended)** example
```md
---
title: OPRO Tips
date: 2025-10-02
categories: [AI, Optimization, Notes]
---
Body…
```

> Rules
> - Use `YYYY-MM-DD` for `date` (e.g., `2025-10-01`).
> - Use **either** `category` (string) **or** `categories` (string array), not both.
> - If no category is provided, the post appears under **Uncategorized**.
> - For cleaner sorting, consider naming files as `YYYY-MM-DD-title.md`.


## 2) Templates

- **Research notes (multiple categories)**:
```md
---
title: Notes on Scientific World Models
date: 2025-10-03
categories: [AI for Science, World Modeling, Notes]
---
Write your content here…
```

- **Project retrospective (single category)**:
```md
---
title: Evolutionary Prompt Optimization – Takeaways
date: 2025-10-04
category: Project
---
Summary of the project…
```

- **Personal update (single category)**:
```md
---
title: Life Update – Fall 2025
date: 2025-10-05
category: Personal
---
Recent updates…
```


## 3) Recommended Structure

```
blogs/
├── 2025-10-01-world-models.md
├── 2025-10-02-opro-tips.md
├── 2025-10-05-life-update.md
└── README.md  ← You can store this guide here
```


## 4) Checklist

- [ ] Did you include the `---` front matter fences at the top/bottom?
- [ ] Did you fill in `title`, `date`, and `category`/`categories`?
- [ ] Is `date` in `YYYY-MM-DD` format?
- [ ] For multiple categories, did you use `categories: [A, B, C]`?
- [ ] Did you commit and push to the `main` branch?


## 5) Troubleshooting

- **Post doesn’t show up**  
  - Ensure the repository is **Public** (a Private repo cannot fetch the list via GitHub API).
  - After pushing, do a hard refresh (Cmd/Ctrl + Shift + R).
  - Double-check front matter keys (`category`/`categories`) and the `---` fences.

- **Category buttons look odd**  
  - Whitespace and case are normalized, but avoid near-duplicates (e.g., `AI` vs `Ai`).


## 6) Tips

- Using `categories` allows one post to appear under multiple sections, improving discoverability.
- For recurring series, add a shared category like `Series` to group them.
- For images/figures, prefer repository-relative paths (e.g., `![cap](../static/img/fig1.png)`).