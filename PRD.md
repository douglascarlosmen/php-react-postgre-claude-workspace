# Product Requirements Document (PRD)

**Project Name:** Elegance Kanban Platform
**Target Audience:** Teams and individuals needing high-performance, visually appealing project management.
**Primary Language (UI):** Portuguese (Brazil) - pt-BR
**Document Language:** English

---

## 1. Executive Summary

The objective is to build a lightweight, ultra-fast, and visually elegant Kanban-style project management system. The platform will support multiple projects, dynamic boards, customizable columns, and detailed task management. The architecture must prioritize minimal server and database resource consumption, utilizing containerization for seamless deployment, and offering a mobile-first, highly responsive user interface.

---

## 2. Technical Architecture & Stack

### 2.1. Frontend

* **Framework:** React.js (Functional components, Hooks).
* **Approach:** Mobile-First, fully responsive for desktop.
* **Performance:** Strict code-splitting, lazy loading of modals, and optimized asset delivery for the lowest possible load times.
* **Routing:** Client-side routing for seamless navigation.

### 2.2. Backend

* **Language:** PHP (Latest LTS version - 8.2 or 8.3).
* **Framework:** A micro-framework (like Slim PHP) or heavily optimized raw PHP routing to ensure the lowest response times and minimal server resource usage. If using a full-stack framework like Laravel, strict configuration caching and minimal middleware must be applied.
* **API:** RESTful JSON API.

### 2.3. Database

* **Engine:** PostgreSQL.
* **Optimization Requirement:** Strict normalization, indexing on all foreign keys and search columns, and avoiding `SELECT *` in queries. Use pagination or cursor-based fetching for boards with massive amounts of cards.

### 2.4. Infrastructure

* **Environment:** 100% containerized.
* **Tooling:** `docker-compose.yml`.
* **Containers:** * Web Server (Nginx)
* Application (PHP-FPM)
* Database (PostgreSQL)


* *Requirement:* Zero local dependencies required. Simply running `docker-compose up -d` must spin up the entire ready-to-use environment.

---

## 3. UI/UX Design & Visual Guidelines

To achieve the "elegant visual elements" and intuitive experience requested, the frontend developer/AI should adhere to the following modern UI/UX trends:

### 3.1. Typography & Colors

* **Typography:** Use modern, highly readable sans-serif fonts such as **Inter**, **Plus Jakarta Sans**, or **Geist**. These provide a clean, structural, and elegant feel.
* **Color Palette:**
* *Background:* Soft off-white or light gray (e.g., `#F9FAFB`) to reduce eye strain.
* *Cards:* Pure white (`#FFFFFF`) with subtle, soft drop shadows (`box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)`).
* *Primary Accent:* A sophisticated color like Deep Indigo (`#4F46E5`) or Slate (`#0F172A`) for primary buttons and active states.
* *Text:* Dark charcoal (`#111827`) for primary text, muted gray (`#6B7280`) for secondary text.



### 3.2. Interactions & Micro-feedback

* **Drag and Drop:** Smooth physics-based dragging (using libraries like `dnd-kit` or `framer-motion`).
* **Loadings:** Use **Skeleton Loaders** instead of traditional spinners for a perceived faster load time.
* **Tooltips:** Elegant, fast-appearing tooltips on hover for icon-only buttons (e.g., user avatars, settings).
* **Banners/Toasts:** Unobtrusive slide-in notifications at the bottom-right or top-center for system feedback (e.g., "Tarefa criada com sucesso").
* **Modals:** Dark semi-transparent backdrop with a slide-up or fade-in scale animation for the task detail view.

---

## 4. Functional Requirements

### 4.1. Authentication

| Feature | Description |
| --- | --- |
| **Login** | Access via `Username` and `Password` only (no email required). |
| **Session** | Secure JWT (JSON Web Token) or secure HttpOnly cookies. |
| **UI** | Clean, minimalist login screen with immediate validation feedback. |

### 4.2. Projects & Boards

| Feature | Description |
| --- | --- |
| **Project Creation** | Users can create $N$ projects. |
| **Board Management** | Each project can contain $N$ Kanban boards. |
| **Board Constraints** | A board *must* be linked to an existing project. Every board requires a "Name". |
| **Navigation** | Easy side-menu or top-bar navigation to switch between projects and their respective boards. |

### 4.3. Custom Columns

| Feature | Description |
| --- | --- |
| **Dynamic Creation** | Users can create an unlimited number of columns per board. |
| **Custom Naming** | Users define the name of the column (e.g., "Backlog", "Fazendo", "Aguardando Aprovação"). |

### 4.4. Task (Card) Management

| Feature | Description |
| --- | --- |
| **Quick Creation** | Hovering over a column displays a "Criar tarefa" button. Clicking creates a pre-card inline, instantly focusing the input field to type the title and hit `Enter` to save. |
| **Drag & Drop** | Users can change a task's status by dragging the card across columns. |

### 4.5. Task Details (Modal)

Clicking a card opens a detailed modal with the following features:

* **Description (Markdown + WYSIWYG):** * Text area supporting standard Markdown (e.g., typing `# Título` auto-formats to an H1).
* Must include a visual formatting toolbar (Bold, Italic, Lists) for ease of use.


* **Assignee Selection:**
* A dropdown/searchable list displaying *all* system users.
* Only **1** user can be assigned to a card at a time.


* **Due Date:**
* A clean date-picker UI to set deadlines.


* **Subtasks (Checklist):**
* Ability to add checklist items.
* Must feature a visual **Progress Bar** that updates in real-time as items are checked off (e.g., `50% concluído`).


* **Status Override:**
* A dropdown menu inside the modal to change the column/status without needing to drag and drop.


* **[Suggested Addition] Priority Tags:** * Simple visual labels (Baixa, Média, Alta) to give users better visual organization on the board without impacting performance.

---

## 5. Database Schema Strategy (Performance Optimized)

To meet the strict "lowest resource usage" requirement, the database should be heavily normalized. Below is the conceptual entity structure:

1. `users` (id, username, password_hash, created_at)
2. `projects` (id, name, created_at)
3. `boards` (id, project_id, name, created_at)
4. `columns` (id, board_id, name, position_order)
5. `tasks` (id, column_id, assignee_id, title, description, due_date, priority, position_order)
6. `subtasks` (id, task_id, title, is_completed)

**Optimization Rules:**

* Create indexes on `project_id`, `board_id`, `column_id`, and `assignee_id`.
* Maintain a `position_order` integer column to handle the drag-and-drop sorting natively and quickly.
* Avoid eager loading descriptions and subtasks on the main board view; fetch them only when the task modal is opened (Lazy Loading) to drastically reduce DB load.

---

## 6. Implementation Checklist for AI Developer

* [ ] Initialize `docker-compose.yml` with Nginx, PHP LTS, and DB.
* [ ] Set up Database schema with strict indexing.
* [ ] Build robust, lightweight PHP backend endpoints for Auth, Projects, Boards, Columns, Tasks, and Subtasks.
* [ ] Initialize React.js frontend with Vite (for fast compilation).
* [ ] Implement UI framework/styling (TailwindCSS recommended for performance and ease of meeting visual requirements).
* [ ] Configure Markdown parser (e.g., `react-markdown`) and WYSIWYG tools.
* [ ] Implement DnD functionality for cards and columns.
* [ ] Ensure all UI strings are localized to `pt-BR`.
* [ ] Perform audit on DB query execution times and Frontend render cycles.