import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

export function Counter() {
  const [count, setCount] = useState(0);
  const { isDarkMode } = useTheme();

  return (
    <div className={`counter ${isDarkMode ? "dark" : "light"}`}>
      <h2>useState Hook Example</h2>
      <p>Current count: {count}</p>

      <button onClick={() => setCount(count + 1)}>Increment</button>

      <button onClick={() => setCount(count - 1)}>Decrement</button>

      <button onClick={() => setCount((prev) => prev * 2)}>Double</button>

      <button onClick={() => setCount(0)}>Reset</button>

      <div className="explanation">
        <h3>How it works:</h3>
        <ul>
          <li>
            The useState hook creates a state variable and its setter function
          </li>
          <li>Initial value is set to 0: useState(0)</li>
          <li>setCount updates trigger re-renders</li>
          <li>
            Functional updates (prev =&gt; prev * 2) ensure we work with the
            latest state
          </li>
        </ul>
      </div>
    </div>
  );
}
