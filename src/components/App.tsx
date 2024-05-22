import { FC, useState } from "react";
import classes from "./App.module.scss";
import { Link, Outlet } from "react-router-dom";
import ImgJpg from "@/assets/img.jpg";
import ImgSvg from "@/assets/Vector.svg";

export const App: FC = () => {
  const [count, setCount] = useState<number>(0);

  const increment = () => setCount((prev) => prev + 1);
  return (
    <div>
      <h1>PLATFORM:{__PLATFORM__}</h1>
      <Link to="/about">about</Link>
      <br />
      <Link to="/shop">shop</Link>
      <div className={classes.value}>{count}</div>
      <button className={classes.button} onClick={increment}>
        Увеличить
      </button>
      <Outlet />
      <div>
        <div>
          <img width={100} src={ImgJpg} alt="" />
        </div>
        <div>
          <ImgSvg style={{ color: "red" }} width={50} height={50} />
        </div>
      </div>
    </div>
  );
};
