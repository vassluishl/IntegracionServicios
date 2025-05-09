import React, { useEffect, useState } from 'react';

function App() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/posts')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
      })
      .then(data => setPosts(data))
      .catch(err => setError(err.message));
  }, []);

  const handlePostClick = (postId) => {
    fetch(`http://localhost:8000/api/posts/${postId}`)
      .then(response => response.json())
      .then(data => setSelectedPost(data))
      .catch(err => setError(err.message));
  };

  return (
    <div className="App" style={{ padding: '2rem' }}>
      <h1>Lista de Posts</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      <ul>
        {posts.slice(0, 10).map(post => (
          <li key={post.id} onClick={() => handlePostClick(post.id)} style={{ cursor: 'pointer', margin: '10px 0' }}>
            <strong>{post.title}</strong>
          </li>
        ))}
      </ul>

      {selectedPost && (
        <div>
          <h2>{selectedPost.title}</h2>
          <p>{selectedPost.body}</p>
        </div>
      )}
    </div>
  );
}

export default App;
