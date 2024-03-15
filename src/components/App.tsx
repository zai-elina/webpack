import { FC, useState } from "react";
import classes from "./App.module.scss";
import { Link, Outlet } from "react-router-dom";

export const App: FC = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount((prev) => prev + 1);
  return (
    <div>
      <Link to="/about">about</Link>
      <br />
      <Link to="/shop">shop</Link>
      <div className={classes.value}>{count}</div>
      <button className={classes.button} onClick={increment}>
        Увеличить
      </button>
      <Outlet />
    </div>
  );
};
