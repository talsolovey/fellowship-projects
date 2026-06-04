import type { FormEvent } from "react";

interface TodoInputProps {
    newTodo: string;
    setNewTodo: (newTodo: string) => void;
    handleAddTodo: (event: FormEvent<HTMLFormElement>) => void;
}

export default function TodoInput({ newTodo, setNewTodo, handleAddTodo }: TodoInputProps) {
    return (
        <form onSubmit={handleAddTodo}>
            <input
                type="text"
                placeholder="What needs to be done?"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
            />
            <button type="submit">Add</button>
        </form>
    )
}