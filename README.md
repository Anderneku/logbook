# 📝 Markdown LogBook with File System – SvelteKit

<img width="1902" height="891" alt="image" src="https://github.com/user-attachments/assets/6dcae601-0fbe-4c86-8686-394b50865d97" />


A lightweight Markdown LogBook editor built with **SvelteKit**, featuring a built-in file system for managing multiple markdown files locally. All edits are instant and persistent during the session.


No adding/naming files needed. Just Log and it gets the timestap sorted automatically in the correct folder

---

## ✨ Features

- 📁 **Multi-file support**  
  Create, select, and delete markdown files using a simple local file system.

- 🖊️ **Live Editing**  
  Changes are immediately reflected in the editor as you type.

- 🔁 **Reactive Data Binding**  
  Powered by Svelte stores, ensuring seamless sync between UI and state.

- 🧠 **Persistent File State**  
  Content is stored in-memory using a `Map` structure like:  
  ```ts
  {
    "2025-07-29": { content: "# Hello World" },
    "2025-07-30": { content: "## Another File" }
  }
  ```
  And a file tree structure like this:
  ```ts
  [["2025",["July",["30","15:05:10_2025_July_30","15:05:14_2025_July_30"]]]]
  ```
  You get the idea

### 📋 Feature Comparison

| Feature            | Supported | Notes                          |
|--------------------|-----------|--------------------------------|
| Multiple Files     | ✅        | Manage separate markdown docs  |
| Live Editing       | ✅        | Updates content in real time   |
| Markdown Preview   | ✅        | Coming in next version         |
| Dark Mode          | ✅        | Respects system theme          |
| File Export        | ❌        | Planned for future release     |
| Theme Switching    | ❌        | Planned for future release     |

