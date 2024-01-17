import { FC, useState } from "react";
import "./App.scss";

export const App: FC = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount((prev) => prev + 1);
  return (
    <div>
      <div className="">{count}</div>
      <button onClick={increment}>Увеличить</button>
    </div>
  );
};
