import { useState } from "react";
import type { Todo } from "../types";
import { useLocalStorage } from "./useLocalStorage";

export function useTodos() {
      const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []); // todo list state
      const [filter, setFilter] = useState<"all" | "active" | "completed">("all"); 
      const [editingId, setEditingId] = useState<string | null>(null); // id of todo being edited
      const [editingTitle, setEditingTitle] = useState<string>(""); // controlled edit input

    const remainingTodosCount = todos.filter(todo => !todo.completed).length; // count computed every rerender

    // filter list based on category
    const filteredTodos = todos.filter((todo: Todo) => {
        if (filter === "active") return !todo.completed;
        if (filter === "completed") return todo.completed
        return true; // all todos
    })

    // create new todo list with added id
    function addTodo(title: string) {
        const trimmed = title.trim();
        if (!trimmed) return;
        
        setTodos((prevTodos: Todo[]) => [...prevTodos, {
            id: crypto.randomUUID(),
            title: trimmed,
            completed: false
        }])
    }

    // filter out todo given id
    function deleteTodo(id: string) {
        setTodos(prevTodo => prevTodo.filter(todo => todo.id !== id));
    }

    // set todo.completed = true
    function completeTodo(id: string) {
        setTodos(prevTodo => prevTodo.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    }

    // Edit button -> sets editing id and controlled input
    function startEdit(id: string, title: string) {
        setEditingId(id);
        setEditingTitle(title);
    }
    
    // controlled input during edit
    function editingTitleChange(title: string) {
        setEditingTitle(title);
    }

    // Save button -> replace edited todo with editedTitle
    function saveEdit(id: string) {
        const trimmed = editingTitle.trim();
        if (!trimmed) return;
        setTodos(prevTodos =>
            prevTodos.map(todo => (todo.id === id ? { ...todo, title: trimmed } : todo))
        );

        // reset editing states
        setEditingId(null); 
        setEditingTitle("");
    }

    // filter out completed todos
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
        completeTodo,
        startEdit,
        editingTitleChange,
        saveEdit,
        clearCompletedTodos
    }
}