import { useState } from "react";
function Button() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <p>Button was clicked {count} times</p>
        <button onClick={() => setCount(count + 1)}>Click me</button>
      </div>
    </>
  );
}

export default Button;