import type { Todo } from './types';
import TodoItem from './TodoItem';

interface TodoListProps {
    todos: Todo[];
    editingId: string | null;
    editingTitle: string;
    onDelete: (id: string) => void;
    onToggleComplete: (id: string) => void;
    onStartEdit: (id: string, title: string) => void;
    onEditingTitleChange: (title: string) => void;
    onSaveEdit: (id: string) => void;
}

export default function TodoList({ todos, editingId, editingTitle, onDelete, onToggleComplete, onStartEdit, onEditingTitleChange, onSaveEdit }: TodoListProps) {
    if (todos.length === 0) {
        return <p>No todos to show</p>;
    }

    return (  
        <ul>
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    editingId={editingId}
                    editingTitle={editingTitle}
                    onDelete={onDelete}
                    onToggleComplete={onToggleComplete}
                    onStartEdit={onStartEdit}
                    onEditingTitleChange={onEditingTitleChange}
                    onSaveEdit={onSaveEdit}
                />
            ))}
        </ul>
    )
}