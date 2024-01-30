import { FC, useState } from "react";
import classes from "./App.module.scss";

export const App: FC = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount((prev) => prev + 1);
  return (
    <div>
      <div className={classes.value}>{count}</div>
      <button className={classes.button} onClick={increment}>
        Увеличить
      </button>
    </div>
  );
};
