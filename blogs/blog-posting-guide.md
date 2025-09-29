---
title: Blog Posting Guide (Markdown + New Features)
date: 2025-09-27
category: Guide
image: static/img/guide_tn.png
summary: "This guide explains how to write and format Markdown posts with new features like images, authors, and custom summaries to ensure they display correctly on the blog."
---

This document explains how to write Markdown posts in the `blogs/` folder so they appear correctly in the **blog list and on the post detail page**. The system reads the Markdown file's **YAML Front Matter** to parse data like `title`, `date`, `category`, and `image`.

You can now add a thumbnail **image**, an **author**, and a custom **summary** to each post.

---

## 1. Quick Start

1.  Create a new `.md` file inside the `blogs/` folder.
2.  Add the **Front Matter** block at the very top of the file, as shown in the example below.
3.  Commit and push the file to the `main` branch. The blog list will update automatically.

###  **Full Example (All Features)**
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
```

> #### **Rules**
>
>   * **`date`**: Must be in `YYYY-MM-DD` format (e.g., `2025-10-01`).
>   * **`category` / `categories`**: Use `category: Name` for a single category or `categories: [Name1, Name2]` for multiple. **Use only one, not both.**
>   * **`image`**: This is the path to the thumbnail image that appears on the blog list card.
>   * **`author`**: (Optional) The author's name. If left blank, it defaults to "Sunghyun Park".
>   * **`summary`**: (Optional) A custom summary for the post page header. If left blank, the first 40 words of the post body are used automatically.
>   * For better file organization, naming files as `YYYY-MM-DD-title.md` is recommended.

-----

## 2. Templates

Copy and paste these templates to get started quickly.

#### ### 🔬 **Research Notes (Multiple Categories)**

```yaml
---
title: Notes on Scientific World Models
date: 2025-10-03
categories: [AI for Science, World Modeling, Notes]
author: Sunghyun Park
image: static/img/world-model-thumb.jpg
summary: "A summary of key insights and recent trends in the application of World Models for scientific discovery."
---
Write your content here…
```

###  **Project Retrospective (Single Category)**

```yaml
---
title: Evolutionary Prompt Optimization Project Retrospective
date: 2025-10-04
category: Project
author: Sunghyun Park
image: static/img/project-opro-thumb.png
summary: "A look back at the implementation, results, and key takeaways from the LLM Course final project on evolutionary prompt optimization."
---
Summary of the project…
```

### 😊 **Personal Update (Single Category)**

```yaml
---
title: Life Update - Fall 2025
date: 2025-10-05
category: Personal
author: Sunghyun Park
image: static/img/personal-fall-2025.png
summary: "Sharing some quick updates on what I've been up to lately."
---
Recent updates…
```

-----

## 3. Recommended Folder Structure

(No changes from before)

```
blogs/
├── 2025-10-01-world-models.md
├── 2025-10-02-opro-tips.md
└── README.md  <- You can store this guide here
```

-----

## 4. Checklist

  - [ ] Did you include the `---` fences at the start and end of the Front Matter?
  - [ ] Did you fill in the required fields: `title`, `date`, `category`/`categories`, and `image`?
  - [ ] Is the `date` in `YYYY-MM-DD` format?
  - [ ] (Optional) Did you add an `author` and `summary` if needed?
  - [ ] If using multiple categories, is it in the `categories: [A, B, C]` format?
  - [ ] Did you commit and push your changes to the `main` branch?

-----

## 5. Troubleshooting

  * **Post is not appearing in the list:**

      * Ensure your GitHub repository is set to **Public**. The system cannot fetch posts from a private repository via the API.
      * Try a **hard refresh** in your browser (Cmd/Ctrl + Shift + R) after pushing.
      * Double-check the Front Matter keys (`title`, `image`, etc.) and the `---` fences for any typos.

  * **Card image appears broken:**

      * Verify that the file **path** in the `image` field is correct.
      * Make sure the image file actually exists at that path in your repository.

  * **Category buttons look odd:**

      * Whitespace and casing are normalized, but it's best to keep category names consistent. For example, use either `AI` or `ai`, but not both.

<!-- end list -->
