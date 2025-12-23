import { useState } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="flex gap-8 mb-8">
        <a
          href="https://vite.dev"
          target="_blank"
          className="hover:opacity-75 transition-opacity"
        >
          <img src={viteLogo} className="h-24 w-24" alt="Vite logo" />
        </a>
        <a
          href="https://react.dev"
          target="_blank"
          className="hover:opacity-75 transition-opacity"
        >
          <img
            src={reactLogo}
            className="h-24 w-24 animate-spin"
            alt="React logo"
          />
        </a>
      </div>
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Vite + React</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors mb-4"
        >
          count is {count}
        </button>
        <p className="text-gray-600">
          Edit{" "}
          <code className="bg-gray-100 px-2 py-1 rounded text-sm">
            src/App.tsx
          </code>{" "}
          and save to test HMR
        </p>
      </div>
      <p className="mt-8 text-gray-500 text-center max-w-md">
        Click on the Vite and React logos to learn more. Tailwind CSS is now
        configured!
      </p>
    </div>
  );
}

export default App;
