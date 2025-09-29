---
title: Blog Posting Guide (Markdown + Categories)
date: 2025-09-29
category: Guide
summary: "This guide explains how to write and format Markdown posts with new features like images, authors, and custom summaries to ensure they display on the blog"
---

This document explains how to write Markdown posts in the `blogs/` folder so they appear correctly in the **blog list and the post detail page**.  
The blog reads the Markdown **YAML front matter** to parse data like `title`, `date`, `category`/`categories`and 'image'.

You can also add a thumbnail **image**, an **author**, and a custom **summary** to each post.

---


### ## 1. Quick Start

1.  Create a new `.md` file inside the `blogs/` folder.
2.  Add the **Front Matter** block at the very top of the file, as shown in the example below.
3.  Commit and push the file to the `main` branch. The blog list will update automatically.

#### ###  **Full Example (All Features)**
This is the recommended format, including the new `image`, `author`, and `summary` fields.

```yaml
---
title: Tips for OPRO Prompt Optimization
date: 2025-10-02
categories: [AI, Optimization, Notes]
author: Jaewook
image: static/img/opro-thumbnail.png
summary: "Learn about advanced techniques for prompt optimization using OPRO and how to combine it with evolutionary algorithms to maximize performance."
---
Start writing your post body here...

Rules

- date: Must be in YYYY-MM-DD format (e.g., 2025-10-01).

- category / categories: Use category: Name for a single category or categories: [Name1, Name2] for multiple. Use only one, not both.

- image: This is the path to the thumbnail image that appears on the blog list card.

- author: (Optional) The author's name. If left blank, it defaults to "Sunghyun Park".

- summary: (Optional) A custom summary for the post page header. If left blank, the first 40 words of the post body are used automatically.

For better file organization, naming files as YYYY-MM-DD-title.md is recommended.

### ## 2. Templates

---
title: Notes on Scientific World Models
date: 2025-10-03
categories: [AI for Science, World Modeling, Notes]
author: Sunghyun Park
image: static/img/world-model-thumb.jpg
summary: "A summary of key insights and recent trends in the application of World Models for scientific discovery."
---
Write your content here…

---
title: Evolutionary Prompt Optimization Project Retrospective
date: 2025-10-04
category: Project
author: Sunghyun Park
image: static/img/project-opro-thumb.png
summary: "A look back at the implementation, results, and key takeaways from the LLM Course final project on evolutionary prompt optimization."
---
Summary of the project…

---
title: Life Update - Fall 2025
date: 2025-10-05
category: Personal
author: Sunghyun Park
image: static/img/personal-fall-2025.png
summary: "Sharing some quick updates on what I've been up to lately."
---
Recent updates…




## 6) Tips

- Using `categories` allows one post to appear under multiple sections, improving discoverability.
- For recurring series, add a shared category like `Series` to group them.
- For images/figures, prefer repository-relative paths (e.g., `![cap](../static/img/fig1.png)`).