import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const API_BASE = process.env.REACT_APP_API_BASE_URL || "";
const TODOS_PATH = process.env.REACT_APP_TODOS_PATH || "/todos";
const [healthy, setHealthy] = useState(true);
console.log("checking workflow:");
 // ✅ Directly inject the external image source URL via environment variable
  const IMAGE_SOURCE_URL = process.env.REACT_APP_IMAGE_URL|| "https://picsum.photos/1200"; ;
  const TEN_MINUTES = parseInt(process.env.REACT_APP_IMAGE_CACHE_TIME, 10) || (10 * 60 * 1000);
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
  const interval = setInterval(async () => {
    try {
      const response = await fetch('/status');
      const data = await response.json();
      setHealthy(data.healthy);
    } catch (err) {
      setHealthy(false);
    }
  }, 3000);

  return () => clearInterval(interval);
}, []);

  useEffect(() => {
    const handleImageCache = () => {
      const cachedTime = localStorage.getItem("image_created_at");
      const cachedUrl = localStorage.getItem("cached_image_url");
      const now = Date.now();
     
      if (cachedTime && cachedUrl && (now - parseInt(cachedTime, 10) < TEN_MINUTES)) {
        // Use the browser cached image URL
        setImageUrl(cachedUrl);
      } else {
        // Cache expired or missing: Generate a fresh URL with a timestamp buster
        const freshUrl = `${IMAGE_SOURCE_URL}?t=${now}`;
        localStorage.setItem("cached_image_url", freshUrl);
        localStorage.setItem("image_created_at", now.toString());
        setImageUrl(freshUrl);
      }
    };

    handleImageCache();
    const interval = setInterval(handleImageCache, TEN_MINUTES);
    return () => clearInterval(interval);
  }, [IMAGE_SOURCE_URL]);

  /* const loadImage = () => {
    setImageUrl(`${API_BASE}${IMAGE_PATH}?t=${Date.now()}`);
  }; */



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

const handleBreak = async () => {
  await fetch('/break', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
  });
  setHealthy(false);
}
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

{/* {todos.map((item) => (
    <div key={item.id} className="todo-item">
      {item.text}
    </div>
  ))} */}
  {todos.map((item) => (
  <div key={item.id} className="todo-item">

    <span
      style={{
        textDecoration: item.done ? 'line-through' : 'none',
        color: item.done ? '#777' : '#000'
      }}
    >
      {item.text}
    </span>

    {item.done ? (
      <span
        style={{
          color: 'green',
          fontWeight: 'bold'
        }}
      >
        Done
      </span>
    ) : (
      <button
        onClick={() => markDone(item.id)}
      >
        Mark done
      </button>
    )}

  </div>
))}

      </div>
<button  onClick={handleBreak} > break the app</button>
     {!healthy && (
        <div className="failure-box">   <h1>System Failure</h1>   <p>     The Todo App is currently unhealthy.     Please wait for recovery.   </p>  </div>)}
      {/* ✅ Footer */}
      <p className="footer">DevOps with Kubernetes 2025</p>
    </div>
  );
}

export default App;