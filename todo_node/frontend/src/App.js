import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const API_BASE = process.env.REACT_APP_API_BASE_URL || "";
const TODOS_PATH = process.env.REACT_APP_TODOS_PATH || "/todos";
const IMAGE_PATH = process.env.REACT_APP_IMAGE_PATH || "/image";
  const [imageUrl, setImageUrl] = useState("");
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  
useEffect(() => {
  fetch(`${API_BASE}${TODOS_PATH}`)
    .then(res => {
      console.log("Response status:", res.status);
      return res.json();
    })
    .then(data => {
      console.log("Todos fetched:", data);
      setTodos(data);
    })
    .catch(err => console.error("Error fetching todos:", err));
}, []);


  useEffect(() => {
    loadImage();

    const interval = setInterval(loadImage, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const loadImage = () => {
    setImageUrl(`${API_BASE}${IMAGE_PATH}?t=${Date.now()}`);
  };



  const handleChange = (e) => {
    if (e.target.value.length <= 140) {
      setTodo(e.target.value);
    }
  };

  const handleSubmit = async () => {
  await fetch(`${API_BASE}${TODOS_PATH}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ todo })
  });

  setTodo('');

  // refresh list
  const res = await fetch(`${API_BASE}${TODOS_PATH}`);
  const data = await res.json();
  setTodos(data);
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

{todos.map((item) => (
    <div key={item.id} className="todo-item">
      {item.text}
    </div>
  ))}

      </div>

      {/* ✅ Footer */}
      <p className="footer">DevOps with Kubernetes 2025</p>
    </div>
  );
}

export default App;