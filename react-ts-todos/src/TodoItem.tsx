import type { Todo } from './types';

interface TodoItemProps {
    todo: Todo;
    editingId: string | null;
    editingTitle: string;
    onDelete: (id: string) => void;
    onToggleComplete: (id: string) => void;
    onStartEdit: (id: string, title: string) => void;
    onEditingTitleChange: (title: string) => void;
    onSaveEdit: (id: string) => void;
}

export default function TodoItem({ todo, editingId, editingTitle, onDelete, onToggleComplete, onStartEdit, onEditingTitleChange, onSaveEdit }: TodoItemProps) {
  return (
    <li>
    <input type="checkbox"
      checked={todo.completed}
      onChange={() => onToggleComplete(todo.id)}/>
    {editingId === todo.id ? (
      <>
        <input 
          type="text"
          value={editingTitle}
          placeholder="Edit todo"
          onChange={(e) => onEditingTitleChange(e.target.value)}
        />
        <button
          onClick={() => onSaveEdit(todo.id)}
        >
          Save
        </button>
    </>
    ) : (
      <>
      <span>{todo.title}</span>
      <button onClick={() => onStartEdit(todo.id, todo.title)}>
        Edit
      </button>
    </>
    )}
    <button onClick={() => onDelete(todo.id)}>Delete</button>
  </li>
  )
}