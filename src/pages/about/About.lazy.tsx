import { lazy } from "react";

//возращает динамический promise, позволяет отложить загрузку кода компонента до тех пор, пока он не будет отображен в первый раз.
export const LazyAbout = lazy(() => import("./About"));
