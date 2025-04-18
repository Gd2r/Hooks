import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { Counter } from "./components/Counter";
import { TodoList } from "./components/Todo";
import "./App.css";

function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme}>
      Switch to {isDarkMode ? "Light" : "Dark"} Mode
    </button>
  );
}

function AppContent() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`app ${isDarkMode ? "dark" : "light"}`}>
      <header>
        <h1>React Hooks Examples</h1>
        <ThemeToggle />
      </header>

      <main>
        <Counter />
        <TodoList />
      </main>

      <footer>
        <p>
          This app demonstrates various React Hooks including useState,
          useEffect, useReducer, useContext, and custom hooks.
        </p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
