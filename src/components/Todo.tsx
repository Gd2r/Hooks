import { useReducer, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

// Define the shape of a todo item
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Define the possible actions
type TodoAction =
  | { type: "ADD"; text: string }
  | { type: "TOGGLE"; id: number }
  | { type: "DELETE"; id: number }
  | { type: "LOAD"; todos: Todo[] };

// Reducer function
function todoReducer(state: Todo[], action: TodoAction): Todo[] {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: Date.now(),
          text: action.text,
          completed: false,
        },
      ];
    case "TOGGLE":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case "DELETE":
      return state.filter((todo) => todo.id !== action.id);
    case "LOAD":
      return action.todos;
    default:
      return state;
  }
}

export function TodoList() {
  const [todos, dispatch] = useReducer(todoReducer, []);
  const { isDarkMode } = useTheme();

  // Load todos from localStorage on mount
  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      dispatch({ type: "LOAD", todos: JSON.parse(savedTodos) });
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    dispatch({ type: "ADD", text });
  };

  return (
    <div className={`todo-list ${isDarkMode ? "dark" : "light"}`}>
      <h2>useReducer &amp; useEffect Example: Todo List</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const input = e.currentTarget.elements.namedItem(
            "todoText"
          ) as HTMLInputElement;
          if (input.value.trim()) {
            addTodo(input.value.trim());
            input.value = "";
          }
        }}
      >
        <input
          type="text"
          name="todoText"
          placeholder="What needs to be done?"
        />
        <button type="submit">Add Todo</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => dispatch({ type: "TOGGLE", id: todo.id })}
            />
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => dispatch({ type: "DELETE", id: todo.id })}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      <div className="explanation">
        <h3>How it works:</h3>
        <ul>
          <li>useReducer manages complex state logic</li>
          <li>useEffect handles side effects (localStorage)</li>
          <li>First useEffect runs once on mount to load saved todos</li>
          <li>Second useEffect runs whenever todos change to save updates</li>
        </ul>
      </div>
    </div>
  );
}
