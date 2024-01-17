import path from "path"; //модуль node js для корректного обрабатывания пути на разных ос
import webpack from "webpack";
import "webpack-dev-server";
import { buildWebpack } from "./config/build/buildWebpack";
import { BuildMode, BuildPaths } from "./config/build/types/types";

interface EnvVariables {
  mode: BuildMode;
  port: number;
}

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    output: path.resolve(__dirname, "build"),
    entry: path.resolve(__dirname, "src", "index.tsx"),
    html: path.resolve(__dirname, "public", "index.html"),
  };

  const config: webpack.Configuration = buildWebpack({
    port: env.port ?? 5000,
    mode: env.mode ?? "development",
    paths,
  });

  return config;
};
