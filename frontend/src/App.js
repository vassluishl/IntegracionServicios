import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Hacer una solicitud GET al backend de FastAPI
    fetch('http://localhost:8000/api/data')
      .then(response => response.json())
      .then(data => setData(data.message))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div className="App">
      <h1>{data ? data : "Cargando..."}</h1>
    </div>
  );
}

export default App;
