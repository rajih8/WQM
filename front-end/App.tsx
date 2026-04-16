import { useState } from "react";
import "./App.css";


function App() {


const [count, setCount] = useState(0);


const [msg, setMsg] = useState("hello");


function handleClick() {
setCount(count + 1); 
}


function reset() {
setCount(0);
}


function changeMessage() {
if (msg === "hello") {
setMsg("welcome!");
} else {
setMsg("hello");
}
}

return ( <div>

```
  <h1>My React App</h1>

  {/* message */}
  <p>{msg}</p>

  {/* buttons */}
  <div style={{ marginBottom: "15px" }}>
    <button onClick={handleClick}>
      clicked {count} times
    </button>

    <button onClick={reset} style={{ marginLeft: "10px" }}>
      reset
    </button>
  </div>

  {/* toggle message */}
  <button onClick={changeMessage}>
    change text
  </button>

  {/* info */}
  <div style={{ marginTop: "20px" }}>
    <p>try editing the code 👍</p>
  </div>

</div>
```

);
}

export default App;
