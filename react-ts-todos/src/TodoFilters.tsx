import type { TodoFilter } from "./types";

interface TodoFiltersProps {
    filter: TodoFilter;
    setFilter: (filter: TodoFilter) => void;
    remainingTodosCount: number;
    clearCompletedTodos: () => void;
}

export default function TodoFilters({ filter, setFilter, remainingTodosCount, clearCompletedTodos }: TodoFiltersProps) {
    return (
        <div>
            <button onClick={() => setFilter("all")} disabled={filter === "all"}>All</button>
            <button onClick={() => setFilter("active")} disabled={filter === "active"}>Active</button>
            <button onClick={() => setFilter("completed")} disabled={filter === "completed"}>Completed</button>
            <div>
                <button onClick={clearCompletedTodos}>Clear Completed Todos</button>
            </div>
            <p>{remainingTodosCount} items to complete</p>
        </div>
    )
}
