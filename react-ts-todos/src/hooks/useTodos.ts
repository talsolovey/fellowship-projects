import { useState } from "react";
import type { Todo, TodoFilter } from "../types";
import { useLocalStorage } from "./useLocalStorage";

export function useTodos() {
      const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
      const [filter, setFilter] = useState<TodoFilter>("all"); 
      const [editingId, setEditingId] = useState<string | null>(null);
      const [editingTitle, setEditingTitle] = useState<string>("");

    const remainingTodosCount = todos.filter(todo => !todo.completed).length;

    const filteredTodos = todos.filter((todo: Todo) => {
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed
        return true;
    })

    function addTodo(title: string) {
        const trimmed = title.trim();
        if (!trimmed) {
            return;
        }
        setTodos((prevTodos: Todo[]) => [...prevTodos, { 
            id: crypto.randomUUID(),
            title: trimmed,
            completed: false
        }])
    }

    function deleteTodo(id: string) {
        setTodos(prevTodo => prevTodo.filter(todo => todo.id !== id));
    }

    function toggleComplete(id: string) {
        setTodos(prevTodo => prevTodo.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    }

    function startEdit(id: string, title: string) {
        setEditingId(id);
        setEditingTitle(title);
    }

    function saveEdit(id: string) {
        const trimmed = editingTitle.trim();
        if (!trimmed) {
            alert("Title cannot be empty");
            setEditingId(null);
            setEditingTitle("");
            return;
        }
        setTodos(prevTodos =>
            prevTodos.map(todo => (todo.id === id ? { ...todo, title: trimmed } : todo))
        );

        setEditingId(null); 
        setEditingTitle("");
    }

    function clearCompletedTodos() {
        setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
    }

    return {
        todos,
        filteredTodos,
        filter,
        editingId,
        editingTitle,
        remainingTodosCount,
        setFilter,
        addTodo,
        deleteTodo,
        toggleComplete,
        startEdit,
        setEditingTitle,
        saveEdit,
        clearCompletedTodos
    }
}
