import React, { useEffect, useState } from "react";

function App() {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    loadImage();

    // refresh every 10 minutes (optional)
    const interval = setInterval(loadImage, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const loadImage = () => {
    setImageUrl("/api/image?t=" + Date.now());
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>The project App</h1>

      {imageUrl && (
        <img src={imageUrl} alt="Random" style={{ width: "500px" }} />
      )}

      <p>DevOps with Kubernetes 2025</p>
    </div>
  );
}

export default App;