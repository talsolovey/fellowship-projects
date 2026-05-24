import { useState } from 'react'
import type React from 'react';
import './App.css'
import TodoList from './TodoList';
import TodoInput from './TodoInput';
import TodoFilters from './TodoFilters';
import { useTodos } from './hooks/useTodos';


function App() {
  const [newTodo, setNewTodo] = useState<string>("");

  const { 
    filteredTodos,
    filter,
    setFilter,
    editingId,
    editingTitle,
    remainingTodosCount,
    addTodo, deleteTodo,
    toggleComplete,
    startEdit,
    setEditingTitle,
    saveEdit,
    clearCompletedTodos,
  } = useTodos();

  function handleAddTodo(event: React.FormEvent<HTMLFormElement>) { 
    event.preventDefault();
    addTodo(newTodo);
    setNewTodo("");
  };
  
  return (
    <div> 
      <h1>Todos App</h1>

      <TodoInput
        newTodo={newTodo}
        setNewTodo={setNewTodo}
        handleAddTodo={handleAddTodo}
      />
    
      <TodoFilters
        filter={filter}
        setFilter={setFilter}
        remainingTodosCount={remainingTodosCount}
        clearCompletedTodos={clearCompletedTodos}
      />

      <TodoList
        todos={filteredTodos}
        editingId={editingId}
        editingTitle={editingTitle}
        onDelete={deleteTodo}
        onToggleComplete={toggleComplete}
        onStartEdit={startEdit}
        onEditingTitleChange={setEditingTitle}
        onSaveEdit={saveEdit}
      />
    </div>
  );
}

export default App
