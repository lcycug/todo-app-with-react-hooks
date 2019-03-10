import React, { useState } from "react";

function App() {
  const [name, setName] = useState("world");
  return <div>Hello, {name}!</div>;
}

export default App;
