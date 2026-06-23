import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [todo, setTodo] = useState("");

  useEffect(() => {
    loadImage();

    const interval = setInterval(loadImage, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const loadImage = () => {
    setImageUrl("/image?t=" + Date.now());
  };

  const todos = [
    "Learn Kubernetes basics",
    "Deploy application to cluster",
    "Configure persistent volumes",
  ];

  const handleChange = (e) => {
    if (e.target.value.length <= 140) {
      setTodo(e.target.value);
    }
  };

  const handleSubmit = () => {
    console.log("Todo submitted:", todo);
    setTodo("");
  };

  return (
    <div className="app-container">
      <h1>The project App</h1>

      {/* ✅ Image */}
      {imageUrl && (
        <img src={imageUrl} alt="Random" className="app-image" />
      )}

      {/* ✅ Input + Button */}
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a new todo (max 140 characters)"
          value={todo}
          onChange={handleChange}
          className="todo-input"
        />

        <button onClick={handleSubmit} className="send-button">
          Send
        </button>
      </div>

      {/* ✅ Character count */}
      <p>{todo.length} / 140</p>

      {/* ✅ Todos */}
      <h2>Todos</h2>

      <div className="todo-list">
        {todos.map((item, index) => (
          <div key={index} className="todo-item">
            {item}
          </div>
        ))}
      </div>

      {/* ✅ Footer */}
      <p className="footer">DevOps with Kubernetes 2025</p>
    </div>
  );
}

export default App;