# React + TypeScript Todos App

## Summary

Built a React + TypeScript Todos app with add / edit / complete / delete, filtering (all / active / completed), “clear completed”, remaining count, empty state, and localStorage persistence.

Scaffolded with Vite (React + TS) and strict TypeScript enabled.

## Architecture

### Component tree

- **App** – top-level container, owns `newTodo` input state and wires hooks/components together
- **TodoInput** – controlled input + submit for creating new todos
- **TodoFilters** – filter buttons (all / active / completed), “clear completed” action, remaining count display
- **TodoList** – renders the list of todos or an empty state message
- **TodoItem** – single todo row: checkbox, title / edit input, Edit / Save / Delete buttons

### Custom hooks

**`useTodos`** – main domain hook that owns todos state and behavior:

- **State:** `todos`, `filter`, `editingId`, `editingTitle`
- **Derived:** `filteredTodos`, `remainingTodosCount`
- **Actions:** `addTodo`, `completeTodo` (toggle), `deleteTodo`, `startEdit`, `editingTitleChange`, `saveEdit`, `clearCompletedTodos`, `setFilter`

Used this to centralize todos logic in one place.

**`useLocalStorage`** – generic hook that wraps `useState` and syncs a value to `localStorage`.

Used in `useTodos` for todos so the list persists across page reloads.

## Tradeoffs / shortcuts

- Kept styling minimal to focus on TypeScript, hooks, and component architecture.